const b = (t, n, e, g, l) => n + 0.5 * l * (e - t + l * (2 * t - 5 * n + 4 * e - g + l * (3 * (n - e) + g - t))), a = (t, n) => b(t[0], t[1], t[2], t[3], n), s = (t, n, e, g, l) => {
  const h = n < 0 ? 0 : n, c = n + 1 > t.length - 1 ? t.length - 1 : n + 1, r = n + 2 > t.length - 1 ? t.length - 1 : n + 2, o = n + 3 > t.length - 1 ? t.length - 1 : n + 3;
  return b(t[h][e][g], t[c][e][g], t[r][e][g], t[o][e][g], l);
}, u = (t, n, e, g, l, h) => {
  const c = e < 0 ? 0 : e, r = e + 1 > t.length - 1 ? t.length - 1 : e + 1, o = e + 2 > t.length - 1 ? t.length - 1 : e + 2, z = e + 3 > t.length - 1 ? t.length - 1 : e + 3;
  return b(
    s(t, n, c, g, l),
    s(t, n, r, g, l),
    s(t, n, o, g, l),
    s(t, n, z, g, l),
    h
  );
}, y = (t, n, e, g, l, h, c) => {
  const r = g < 0 ? 0 : g, o = g + 1 > t.length - 1 ? t.length - 1 : g + 1, z = g + 2 > t.length - 1 ? t.length - 1 : g + 2, C = g + 3 > t.length - 1 ? t.length - 1 : g + 3;
  return b(
    u(t, n, e, r, l, h),
    u(t, n, e, o, l, h),
    u(t, n, e, z, l, h),
    u(t, n, e, C, l, h),
    c
  );
};
export {
  u as getBicubic,
  s as getCubic,
  a as getCubicArr,
  b as getCubicVal,
  y as getTricubic
};
