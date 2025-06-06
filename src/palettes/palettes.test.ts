/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { describe, it, expect } from "vitest";

import { Hct } from "../hct/hct";

import { CorePalette } from "./core_palette";
import { TonalPalette } from "./tonal_palette";

describe("TonalPalette", () => {
  it("ofBlue", () => {
    const blue = TonalPalette.fromInt(0xff0000ff);

    expect(blue.tone(100)).toBe(0xffffffff);
    expect(blue.tone(95)).toBe(0xfff1efff);
    expect(blue.tone(90)).toBe(0xffe0e0ff);
    expect(blue.tone(80)).toBe(0xffbec2ff);
    expect(blue.tone(70)).toBe(0xff9da3ff);
    expect(blue.tone(60)).toBe(0xff7c84ff);
    expect(blue.tone(50)).toBe(0xff5a64ff);
    expect(blue.tone(40)).toBe(0xff343dff);
    expect(blue.tone(30)).toBe(0xff0000ef);
    expect(blue.tone(20)).toBe(0xff0001ac);
    expect(blue.tone(10)).toBe(0xff00006e);
    expect(blue.tone(0)).toBe(0xff000000);
  });
});

describe("CorePalette", () => {
  it("ofBlue", () => {
    const core = CorePalette.of(0xff0000ff);

    expect(core.a1.tone(100)).toBe(0xffffffff);
    expect(core.a1.tone(95)).toBe(0xfff1efff);
    expect(core.a1.tone(90)).toBe(0xffe0e0ff);
    expect(core.a1.tone(80)).toBe(0xffbec2ff);
    expect(core.a1.tone(70)).toBe(0xff9da3ff);
    expect(core.a1.tone(60)).toBe(0xff7c84ff);
    expect(core.a1.tone(50)).toBe(0xff5a64ff);
    expect(core.a1.tone(40)).toBe(0xff343dff);
    expect(core.a1.tone(30)).toBe(0xff0000ef);
    expect(core.a1.tone(20)).toBe(0xff0001ac);
    expect(core.a1.tone(10)).toBe(0xff00006e);
    expect(core.a1.tone(0)).toBe(0xff000000);

    expect(core.a2.tone(100)).toBe(0xffffffff);
    expect(core.a2.tone(95)).toBe(0xfff1efff);
    expect(core.a2.tone(90)).toBe(0xffe1e0f9);
    expect(core.a2.tone(80)).toBe(0xffc5c4dd);
    expect(core.a2.tone(70)).toBe(0xffa9a9c1);
    expect(core.a2.tone(60)).toBe(0xff8f8fa6);
    expect(core.a2.tone(50)).toBe(0xff75758b);
    expect(core.a2.tone(40)).toBe(0xff5c5d72);
    expect(core.a2.tone(30)).toBe(0xff444559);
    expect(core.a2.tone(20)).toBe(0xff2e2f42);
    expect(core.a2.tone(10)).toBe(0xff191a2c);
    expect(core.a2.tone(0)).toBe(0xff000000);
  });

  it("contentOfBlue", () => {
    const core = CorePalette.contentOf(0xff0000ff);

    expect(core.a1.tone(100)).toBe(0xffffffff);
    expect(core.a1.tone(95)).toBe(0xfff1efff);
    expect(core.a1.tone(90)).toBe(0xffe0e0ff);
    expect(core.a1.tone(80)).toBe(0xffbec2ff);
    expect(core.a1.tone(70)).toBe(0xff9da3ff);
    expect(core.a1.tone(60)).toBe(0xff7c84ff);
    expect(core.a1.tone(50)).toBe(0xff5a64ff);
    expect(core.a1.tone(40)).toBe(0xff343dff);
    expect(core.a1.tone(30)).toBe(0xff0000ef);
    expect(core.a1.tone(20)).toBe(0xff0001ac);
    expect(core.a1.tone(10)).toBe(0xff00006e);
    expect(core.a1.tone(0)).toBe(0xff000000);

    expect(core.a2.tone(100)).toBe(0xffffffff);
    expect(core.a2.tone(95)).toBe(0xfff1efff);
    expect(core.a2.tone(90)).toBe(0xffe0e0ff);
    expect(core.a2.tone(80)).toBe(0xffc1c3f4);
    expect(core.a2.tone(70)).toBe(0xffa5a7d7);
    expect(core.a2.tone(60)).toBe(0xff8b8dbb);
    expect(core.a2.tone(50)).toBe(0xff7173a0);
    expect(core.a2.tone(40)).toBe(0xff585b86);
    expect(core.a2.tone(30)).toBe(0xff40436d);
    expect(core.a2.tone(20)).toBe(0xff2a2d55);
    expect(core.a2.tone(10)).toBe(0xff14173f);
    expect(core.a2.tone(0)).toBe(0xff000000);
  });
});

describe("KeyColor", () => {
  it("Key color with exact chroma", () => {
    // Requested chroma is exactly achievable at a certain tone.
    const palette = TonalPalette.fromHueAndChroma(50.0, 60.0);
    const result = palette.keyColor;

    const hueDifference = Math.abs(result.hue - 50.0);
    expect(hueDifference).toBeLessThan(10.0);
    const chromaDifference = Math.abs(result.chroma - 60.0);
    expect(chromaDifference).toBeLessThan(0.5);
    // Tone might vary, but should be within the range from 0 to 100.
    expect(result.tone).toBeGreaterThan(0);
    expect(result.tone).toBeLessThan(100);
  });

  it("key color with unusually high chroma", () => {
    // Requested chroma is above what is achievable. For Hue 149, chroma peak
    // is 89.6 at Tone 87.9. The result key color's chroma should be close to
    // the chroma peak.
    const palette = TonalPalette.fromHueAndChroma(149.0, 200.0);
    const result = palette.keyColor;

    const hueDifference = Math.abs(result.hue - 149.0);
    expect(hueDifference).toBeLessThan(10.0);
    expect(result.chroma).toBeGreaterThan(89.0);
    // Tone might vary, but should be within the range from 0 to 100.
    expect(result.tone).toBeGreaterThan(0);
    expect(result.tone).toBeLessThan(100);
  });

  it("key color with unusually low chroma", () => {
    // By definition, the key color should be the first tone, starting from
    // Tone 50, matching the given hue and chroma. When requesting a very low
    // chroma, the result should be close to Tone 50, since most tones can
    // produce a low chroma.
    const palette = TonalPalette.fromHueAndChroma(50.0, 3.0);
    const result = palette.keyColor;

    const hueDifference = Math.abs(result.hue - 50.0);
    expect(hueDifference).toBeLessThan(10.0);
    const chromaDifference = Math.abs(result.chroma - 3.0);
    expect(chromaDifference).toBeLessThan(0.5);
    const toneDifference = Math.abs(result.tone - 50.0);
    expect(toneDifference).toBeLessThan(0.5);
  });
});
