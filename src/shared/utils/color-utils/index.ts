interface IRoleColorMapping {
  [role: string]: {
    paletteIndex: number;
    shadeIndex: number;
  };
}

// Define color palettes for roles
const colorPalettes = [
  ["#BBF7D0", "#86EFAC", "#4ADE80", "#22C55E", "#16A34A", "#15803D"], // Shades of green
  [
    "#FECACA",
    "#FCA5A5",
    "#F87171",
    "#EF4444",
    "#DC2626",
    "#B91C1C",
    "#FEE2E2",
    "#FEF2F2",
  ], // Shades of red
  ["#FED7AA", "#FDBA74", "#FB923C", "#F97316", "#EA580C", "#FFEDD5"], // Shades of orange
  ["#BAE6FD", "#7DD3FC", "#38BDF8", "#0EA5E9", "#0284C7", "#0369A1"], // Shades of blue
  ["#F5D0FE", "#F0ABFC", "#E879F9", "#D946EF", "#C026D3", "#A21CAF"], // Shades of blue
];

let roleColorMapping: IRoleColorMapping = {};

export const getColorForRole = (role: string) => {
  if (!roleColorMapping[role]) {
    // Assign the next palette to this role
    const paletteIndex =
      Object.keys(roleColorMapping).length % colorPalettes.length;
    roleColorMapping[role] = { paletteIndex, shadeIndex: 0 };
  }

  const { paletteIndex, shadeIndex } = roleColorMapping[role];
  const color =
    colorPalettes[paletteIndex][
      shadeIndex % colorPalettes[paletteIndex].length
    ];
  // Update the shade index for the next item of the same role
  roleColorMapping[role].shadeIndex += 1;

  return color;
};
