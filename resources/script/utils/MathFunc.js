export const MathFunc = {
  /**
   * Returns value clamped to the inclusive range of min and max.
   * @param {number} value The value to be clamped.
   * @param {number} min The lower bound of the result.
   * @param {number} max The upper bound of the result.
   * @returns value if min ≤ value ≤ max.
   *    -or-
   *    min if value < min.
   *    -or-
   *    max if max < value.
   */
  clamp: (value, min, max) => Math.max(min, Math.min(max, value)),

  lerp: (value, a, b) => {
    return (1 - value) * a + value * b;
  },
};
