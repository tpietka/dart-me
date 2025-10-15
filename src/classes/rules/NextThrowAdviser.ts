import { DartThrow, IDartThrow } from "../DartThrow";
import { IOutRule } from "../IOutRule";
import { IThrowAdviser } from "../IThrowAdviser";
import { Points } from "../valueObjects/Points";

interface Checkout {
    firstThrow: IDartThrow;
    totalScore: number;
    expectedValue: number;
}

const HIT_PROBABILITIES = {
    BULL: 0.3,
    OUTER_BULL: 0.5,
    TREBLE: 0.4,
    DOUBLE: 0.6,
    SINGLE_EASY: 0.85,
    SINGLE_REGULAR: 0.8
};

const SETUP_BONUSES = {
    BULL_50: 2.5,
    GOLDEN_32: 3.0,
    GOLDEN_16: 2.5,
    GOLDEN_OTHER: 2.0,
    TIER2: 1.5,
    TIER3: 1.2,
    ODD_PENALTY: 0.6,
    INVALID_PENALTY: 0.5,
    DIFFICULT_PENALTY: 0.7,
    POWER_OF_2_MULTIPLIER: 0.3
};

const TARGET_NUMBERS = {
    ONE_DART: [32, 40, 50, 48, 36, 24, 16, 20],
    TWO_DARTS: [50, 40, 32, 36, 38, 34, 30, 28, 26, 24, 22, 20, 16, 18, 14, 12, 10, 8, 6, 4, 2],
    THREE_DARTS: [32, 40, 50, 36, 24, 16, 20, 48, 60, 64, 96, 100, 80, 90, 110, 120, 130, 140]
};

const OPTIMAL_FIRST_DARTS: { [key: number]: { points: number, multiplier: number } } = {
    170: { points: 20, multiplier: 3 }, 167: { points: 20, multiplier: 3 }, 164: { points: 20, multiplier: 3 },
    161: { points: 20, multiplier: 3 }, 160: { points: 20, multiplier: 3 }, 158: { points: 20, multiplier: 3 },
    157: { points: 20, multiplier: 3 }, 156: { points: 20, multiplier: 3 }, 130: { points: 20, multiplier: 3 },
    127: { points: 20, multiplier: 3 }, 126: { points: 19, multiplier: 3 }, 125: { points: 20, multiplier: 3 },
    124: { points: 20, multiplier: 3 }, 123: { points: 19, multiplier: 3 }, 122: { points: 18, multiplier: 3 },
    121: { points: 20, multiplier: 3 }, 120: { points: 20, multiplier: 3 }, 119: { points: 19, multiplier: 3 },
    118: { points: 20, multiplier: 3 }, 117: { points: 20, multiplier: 3 }, 116: { points: 20, multiplier: 3 },
    115: { points: 20, multiplier: 3 }, 114: { points: 20, multiplier: 3 }, 113: { points: 20, multiplier: 3 },
    112: { points: 20, multiplier: 3 }, 111: { points: 20, multiplier: 3 }, 110: { points: 20, multiplier: 3 },
    109: { points: 20, multiplier: 3 }, 108: { points: 20, multiplier: 3 }, 107: { points: 19, multiplier: 3 },
    106: { points: 20, multiplier: 3 }, 105: { points: 20, multiplier: 3 }, 104: { points: 18, multiplier: 3 },
    103: { points: 19, multiplier: 3 }, 102: { points: 20, multiplier: 3 }, 101: { points: 17, multiplier: 3 },
    100: { points: 20, multiplier: 3 }, 99: { points: 19, multiplier: 3 }, 98: { points: 20, multiplier: 3 },
    97: { points: 19, multiplier: 3 }, 96: { points: 20, multiplier: 3 }, 95: { points: 19, multiplier: 3 },
    94: { points: 18, multiplier: 3 }, 93: { points: 19, multiplier: 3 }, 92: { points: 20, multiplier: 3 },
    91: { points: 17, multiplier: 3 }, 90: { points: 20, multiplier: 3 }, 89: { points: 19, multiplier: 3 },
    88: { points: 20, multiplier: 3 }, 87: { points: 17, multiplier: 3 }, 86: { points: 18, multiplier: 3 },
    85: { points: 15, multiplier: 3 }, 84: { points: 20, multiplier: 3 }, 83: { points: 17, multiplier: 3 },
    82: { points: 14, multiplier: 3 }, 81: { points: 19, multiplier: 3 }, 80: { points: 16, multiplier: 3 },
    79: { points: 13, multiplier: 3 }, 78: { points: 18, multiplier: 3 }, 77: { points: 19, multiplier: 3 },
    76: { points: 20, multiplier: 3 }, 75: { points: 17, multiplier: 3 }, 74: { points: 14, multiplier: 3 },
    73: { points: 19, multiplier: 3 }, 72: { points: 16, multiplier: 3 }, 71: { points: 13, multiplier: 3 },
    70: { points: 18, multiplier: 3 }, 69: { points: 19, multiplier: 3 }, 68: { points: 20, multiplier: 3 },
    67: { points: 17, multiplier: 3 }, 66: { points: 10, multiplier: 3 }, 65: { points: 19, multiplier: 3 },
    64: { points: 16, multiplier: 3 }, 63: { points: 13, multiplier: 3 }, 62: { points: 10, multiplier: 3 },
    61: { points: 15, multiplier: 3 }
};

function generateAllScores(): IDartThrow[] {
    const scores: IDartThrow[] = [];
    for (let i = 1; i <= 20; i++) {
        scores.push(new DartThrow(i, 1));
        scores.push(new DartThrow(i, 2));
        scores.push(new DartThrow(i, 3));
    }
    scores.push(new DartThrow(25, 2));
    scores.push(new DartThrow(25, 1));
    return scores;
}

function getOptimalFirstDart(pointsLeft: number): IDartThrow | null {
    const optimal = OPTIMAL_FIRST_DARTS[pointsLeft];
    return optimal ? new DartThrow(optimal.points, optimal.multiplier) : null;
}

export class NextThrowAdviser implements IThrowAdviser {
    private readonly allPossibleScores: IDartThrow[];
    private readonly _outRule: IOutRule;

    constructor(outRule: IOutRule) {
        this._outRule = outRule;
        this.allPossibleScores = generateAllScores();
    }

    create(outRule: IOutRule): NextThrowAdviser {
        return new NextThrowAdviser(outRule);
    }

    suggest(pointsLeft: number, dartsLeft: number = 3): IDartThrow {
        if (dartsLeft === 3) {
            const optimal = getOptimalFirstDart(pointsLeft);
            if (optimal) return optimal;
        }

        const allCheckouts = this.findAllCheckouts(pointsLeft, dartsLeft);
        if (allCheckouts.length === 0) {
            return this.getBestSetupThrow(pointsLeft, dartsLeft);
        }

        const directFinish = allCheckouts.find(c => c.firstThrow.getScore() === pointsLeft);
        return directFinish
            ? this.getBestCheckout([directFinish])
            : this.getBestCheckout(allCheckouts);
    }

    private getBestSetupThrow(pointsLeft: number, dartsLeft: number): IDartThrow {
        const targetNumbers = this.getTargetNumbers(dartsLeft);

        if (pointsLeft % 2 !== 0 && pointsLeft > 100) {
            return this.getMaximumScoringThrow(pointsLeft);
        }

        const setupThrow = this.findBestSetupForTargets(pointsLeft, targetNumbers);
        if (setupThrow) return setupThrow;

        if (pointsLeft % 2 !== 0) {
            return this.getMaximumScoringThrow(pointsLeft);
        }

        const evenSetup = this.findHighestTrebleLeavingEven(pointsLeft);
        if (evenSetup) return evenSetup;

        return this.getMaximumScoringThrow(pointsLeft);
    }

    private getTargetNumbers(dartsLeft: number): number[] {
        if (dartsLeft === 1) return TARGET_NUMBERS.ONE_DART;
        if (dartsLeft === 2) return TARGET_NUMBERS.TWO_DARTS;
        return TARGET_NUMBERS.THREE_DARTS;
    }

    private findBestSetupForTargets(pointsLeft: number, targetNumbers: number[]): IDartThrow | null {
        let bestThrow: IDartThrow | null = null;
        let bestScore = -1;

        for (const throwData of this.allPossibleScores) {
            const remaining = pointsLeft - throwData.getScore();
            if (remaining >= 0 && targetNumbers.includes(remaining)) {
                const score = throwData.getScore() *
                    this.getSetupBonus(remaining) *
                    this.getHitProbability(throwData);

                if (score > bestScore) {
                    bestScore = score;
                    bestThrow = throwData;
                }
            }
        }
        return bestThrow;
    }

    private findHighestTrebleLeavingEven(pointsLeft: number): IDartThrow | null {
        for (let i = 20; i >= 15; i--) {
            const afterTreble = pointsLeft - (i * 3);
            if (afterTreble >= 0 && afterTreble % 2 === 0) {
                return new DartThrow(i, 3);
            }
        }
        return null;
    }

    private getMaximumScoringThrow(pointsLeft: number): IDartThrow {
        const trebles = [20, 19, 18, 17];
        for (const num of trebles) {
            if (num * 3 <= pointsLeft) return new DartThrow(num, 3);
        }
        if (pointsLeft >= 50) return new DartThrow(25, 2);
        for (let i = 20; i >= 1; i--) {
            if (i * 3 <= pointsLeft) return new DartThrow(i, 3);
        }
        for (let i = 20; i >= 1; i--) {
            if (i * 2 <= pointsLeft) return new DartThrow(i, 2);
        }
        for (let i = 20; i >= 1; i--) {
            if (i <= pointsLeft) return new DartThrow(i, 1);
        }
        return DartThrow.empty();
    }

    private findAllCheckouts(targetScore: number, maxDarts: number): Checkout[] {
        const checkouts: Checkout[] = [];
        const maxPossibleFinish = this.getMaxPossibleFinish(maxDarts);
        const needsScoring = targetScore > maxPossibleFinish;

        for (const firstThrow of this.allPossibleScores) {
            if (firstThrow.getScore() > targetScore) continue;

            const remaining = targetScore - firstThrow.getScore();

            if (remaining === 0) {
                if (this._outRule.isValidFinish(firstThrow, Points.create(0))) {
                    checkouts.push(this.createCheckout(firstThrow, targetScore, remaining, 0));
                }
            } else if (maxDarts > 1) {
                if (needsScoring && firstThrow.multiplier !== 3) continue;
                if (this.canFinish(remaining, maxDarts - 1)) {
                    checkouts.push(this.createCheckout(firstThrow, targetScore, remaining, maxDarts - 1));
                }
            }
        }
        return checkouts;
    }

    private createCheckout(firstThrow: IDartThrow, totalScore: number, remaining: number, dartsLeft: number): Checkout {
        return {
            firstThrow,
            totalScore,
            expectedValue: this.calculateExpectedValue(firstThrow, remaining, dartsLeft)
        };
    }

    private canFinish(remaining: number, dartsLeft: number): boolean {
        if (remaining === 0) return true;
        if (dartsLeft === 0) return false;

        for (const throwData of this.allPossibleScores) {
            if (throwData.getScore() > remaining) continue;
            const newRemaining = remaining - throwData.getScore();

            if (dartsLeft === 1) {
                if (newRemaining === 0 && this._outRule.isValidFinish(throwData, Points.create(0))) {
                    return true;
                }
            } else {
                if (this.canFinish(newRemaining, dartsLeft - 1)) {
                    return true;
                }
            }
        }
        return false;
    }

    private calculateFinishProbability(score: number, dartsLeft: number): number {
        if (score === 0) return 1.0;
        if (dartsLeft === 0) return 0.0;

        let maxProbability = 0;

        for (const throwData of this.allPossibleScores) {
            if (throwData.getScore() > score) continue;
            const remaining = score - throwData.getScore();
            const hitProb = this.getHitProbability(throwData);

            if (dartsLeft === 1) {
                if (remaining === 0 && this._outRule.isValidFinish(throwData, Points.create(0))) {
                    maxProbability = Math.max(maxProbability, hitProb);
                }
            } else {
                const restProb = this.calculateFinishProbability(remaining, dartsLeft - 1);
                maxProbability = Math.max(maxProbability, hitProb * restProb);
            }
        }
        return maxProbability;
    }

    private calculateExpectedValue(firstThrow: IDartThrow, remaining: number, dartsLeft: number): number {
        const firstThrowProb = this.getHitProbability(firstThrow);
        const firstThrowValue = firstThrow.getScore();

        if (remaining === 0) {
            return firstThrowProb * firstThrowValue;
        }

        const finishProbability = this.calculateFinishProbability(remaining, dartsLeft);
        if (finishProbability === 0) return 0;

        const setupBonus = this.getSetupBonus(remaining);
        return firstThrowProb * finishProbability * (firstThrowValue + remaining) * setupBonus;
    }

    private getSetupBonus(remaining: number): number {
        if (remaining === 50) return SETUP_BONUSES.BULL_50;
        if (remaining % 2 !== 0) return SETUP_BONUSES.ODD_PENALTY;

        const doubleNeeded = remaining / 2;
        if (doubleNeeded > 20 && doubleNeeded !== 25) {
            return SETUP_BONUSES.INVALID_PENALTY;
        }

        let bonus = 1.0 + (this.countPowersOfTwo(remaining) * SETUP_BONUSES.POWER_OF_2_MULTIPLIER);
        bonus *= this.getTierMultiplier(remaining);

        if (doubleNeeded <= 3 || doubleNeeded > 20) {
            bonus *= SETUP_BONUSES.DIFFICULT_PENALTY;
        }

        return bonus;
    }

    private countPowersOfTwo(num: number): number {
        let count = 0;
        while (num % 2 === 0 && num > 0) {
            count++;
            num /= 2;
        }
        return count;
    }

    private getTierMultiplier(remaining: number): number {
        if (remaining === 32) return SETUP_BONUSES.GOLDEN_32;
        if (remaining === 16) return SETUP_BONUSES.GOLDEN_16;
        if ([8, 4, 2].includes(remaining)) return SETUP_BONUSES.GOLDEN_OTHER;
        if ([40, 42, 24, 12, 6, 36].includes(remaining)) return SETUP_BONUSES.TIER2;
        if ([20, 18, 14, 10, 30, 26, 22, 34, 38].includes(remaining)) return SETUP_BONUSES.TIER3;
        return 1.0;
    }

    private getHitProbability(throwData: IDartThrow): number {
        if (throwData.points === 25) {
            return throwData.multiplier === 2 ? HIT_PROBABILITIES.BULL : HIT_PROBABILITIES.OUTER_BULL;
        }
        if (throwData.multiplier === 3) return HIT_PROBABILITIES.TREBLE;
        if (throwData.multiplier === 2) return HIT_PROBABILITIES.DOUBLE;
        return throwData.points <= 5 ? HIT_PROBABILITIES.SINGLE_EASY : HIT_PROBABILITIES.SINGLE_REGULAR;
    }

    private getMaxPossibleFinish(dartsLeft: number): number {
        if (dartsLeft === 1) return 50;
        if (dartsLeft === 2) return 110;
        return 170;
    }

    private getBestCheckout(checkouts: Checkout[]): IDartThrow {
        return checkouts.sort((a, b) => b.expectedValue - a.expectedValue)[0].firstThrow;
    }
}