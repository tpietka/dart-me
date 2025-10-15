import { DoubleOutRule } from "../src/classes/rules/DoubleOutRule";
import { NextThrowAdviser } from "../src/classes/rules/NextThrowAdviser";

describe("NextThrowAdviser - 3 darts left", () => {
    it("should suggest S9 with 41 points left", () => {
        let pointsLeft = 41;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(9);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest S3 with 35 points left", () => {
        let pointsLeft = 35;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(3);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest S13 with 45 points left", () => {
        let pointsLeft = 45;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(13);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest D18 with 36 points left", () => {
        let pointsLeft = 36;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(18);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest S1 with 33 points left", () => {
        let pointsLeft = 33;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest S9 with 25 points left", () => {
        let pointsLeft = 25;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(9);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(16);
    });

    it("should suggest D8 with 16 points left", () => {
        let pointsLeft = 16;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(8);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest S7 with 15 points left", () => {
        let pointsLeft = 15;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(7);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(8);
    });

    it("should suggest T17 with 101 points left", () => {
        let pointsLeft = 101;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(17);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(50);
    });

    it("should suggest S17 with 49 points left", () => {
        let pointsLeft = 49;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(17);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest T20 with 121 points left", () => {
        let pointsLeft = 121;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(61);
    });

    it("should suggest T19 with 99 points left", () => {
        let pointsLeft = 99;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(19);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(42);
    });

    it("should suggest S19 with 51 points left", () => {
        let pointsLeft = 51;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(19);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest T16 with 80 points left", () => {
        let pointsLeft = 80;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(16);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(32);
    });

    it("should suggest T20 with 170 points left (max checkout)", () => {
        let pointsLeft = 170;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(110); // T20-T20-Bull
    });

    it("should suggest T17 with 167 points left", () => {
        let pointsLeft = 167;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3); // T20-T19-Bull
    });

    it("should suggest T20 with 160 points left", () => {
        let pointsLeft = 160;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3); // T20-T20-D20
    });

    it("should suggest D20 with 40 points left (direct finish)", () => {
        let pointsLeft = 40;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest Bull with 50 points left (direct finish)", () => {
        let pointsLeft = 50;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(25);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest D1 with 2 points left (direct finish)", () => {
        let pointsLeft = 2;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest S1 with 1 point left (impossible to finish)", () => {
        let pointsLeft = 1;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(1);
    });

    it("should suggest T20 with 169 points left (impossible - odd)", () => {
        let pointsLeft = 169;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.multiplier).toBe(3);
        expect(result.points).toBe(20); // Maximize score to leave 109
    });

    it("should suggest T15 with 85 points left", () => {
        let pointsLeft = 85;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(15);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(40); // leaves D20
    });

    it("should suggest T17 with 91 points left", () => {
        let pointsLeft = 91;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft);
        expect(result.points).toBe(17);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(40); // leaves D20
    });
});

describe("NextThrowAdviser - 2 darts left", () => {
    it("should suggest T15 with 61 points left", () => {
        let pointsLeft = 61;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(15);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(16); // leaves D8
    });

    it("should suggest D20 with 40 points left (direct finish)", () => {
        let pointsLeft = 40;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0); // direct finish
    });

    it("should suggest T19 with 97 points left", () => {
        let pointsLeft = 97;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(19);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(40); // leaves D20
    });

    it("should suggest T19 with 81 points and 2 darts left", () => {
        let pointsLeft = 81;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(19);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(24); // leaves D12
    });

    it("should suggest S16 with 48 points left", () => {
        let pointsLeft = 48;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(16);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(32); // leaves D16
    });

    it("should suggest T20 with 110 points left (max 2-dart checkout)", () => {
        let pointsLeft = 110;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(50); // leaves Bull
    });

    it("should suggest T20 with 111 points left (impossible to finish)", () => {
        let pointsLeft = 111;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.multiplier).toBe(3); // Should be treble to reduce score
    });

    it("should suggest S1 with 3 points left", () => {
        let pointsLeft = 3;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(1);
        expect(pointsLeft - result.points * result.multiplier).toBe(2); // leaves D1
    });

    it("should suggest T11 with 65 points left", () => {
        let pointsLeft = 65;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(11);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(32); // leaves D16
    });

    it("should suggest Bull with 50 points left (direct finish)", () => {
        let pointsLeft = 50;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(25);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest T20 with 100 points left", () => {
        let pointsLeft = 100;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(40); // T20-D20
    });

    it("should suggest D16 with 32 points left (direct finish)", () => {
        let pointsLeft = 32;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(16);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest T19 with 95 points left", () => {
        let pointsLeft = 95;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(19);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(38); // leaves D19
    });

    it("should suggest D12 with 24 points left (direct finish)", () => {
        let pointsLeft = 24;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 2);
        expect(result.points).toBe(12);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0); // direct finish
    });
});

describe("NextThrowAdviser - 1 dart left", () => {
    it("should suggest D20 with 40 points left", () => {
        let pointsLeft = 40;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest D16 with 32 points left", () => {
        let pointsLeft = 32;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(16);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest Bull with 50 points left", () => {
        let pointsLeft = 50;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(25);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest T17 with 99 points left (can't finish)", () => {
        let pointsLeft = 99;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(17);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(48); // leaves good setup
    });

    it("should suggest T20 with 180 points left (can't finish)", () => {
        let pointsLeft = 180;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(120); // leaves 120 for next round
    });

    it("should suggest D1 with 2 points left", () => {
        let pointsLeft = 2;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest D10 with 20 points left", () => {
        let pointsLeft = 20;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(10);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest T11 with 65 points left (sets up 32)", () => {
        let pointsLeft = 65;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.multiplier).toBe(3);
        expect(result.points).toBe(11);
        expect(pointsLeft - result.points * result.multiplier).toBe(32); // leaves D16
    });

    it("should suggest S19 with 51 points left (sets up 32)", () => {
        let pointsLeft = 51;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.multiplier).toBe(1);
        expect(result.points).toBe(19);
        expect(pointsLeft - result.points * result.multiplier).toBe(32); // leaves D16
    });

    it("should suggest D8 with 16 points left", () => {
        let pointsLeft = 16;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(8);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest S1 with 1 point left (impossible to finish)", () => {
        let pointsLeft = 1;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(1);
        expect(result.multiplier).toBe(1);
    });

    it("should suggest D18 with 36 points left", () => {
        let pointsLeft = 36;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(18);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest D5 with 10 points left", () => {
        let pointsLeft = 10;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(5);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest D2 with 4 points left", () => {
        let pointsLeft = 4;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(2);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });

    it("should suggest T20 with 150 points left (can't finish)", () => {
        let pointsLeft = 150;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(20);
        expect(result.multiplier).toBe(3);
        expect(pointsLeft - result.points * result.multiplier).toBe(90); // leaves 90 for next round
    });

    it("should suggest D12 with 24 points left", () => {
        let pointsLeft = 24;
        const result = new NextThrowAdviser(DoubleOutRule.create()).suggest(pointsLeft, 1);
        expect(result.points).toBe(12);
        expect(result.multiplier).toBe(2);
        expect(pointsLeft - result.points * result.multiplier).toBe(0);
    });
});