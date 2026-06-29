function minPathSum(grid: number[][]): number {
  const m = grid.length;
  const n = grid[0].length;

  const sol: number[][] = [];

  for (const _ of grid) {
    sol.push([]);
    for (const __ of grid[0]) {
      sol[sol.length-1].push(0);
    }
  }

  sol[0][0] = grid[0][0];

  for (let i = 1; i < m; i++) {
    sol[i][0] = sol[i-1][0] + grid[i][0];
  }

  for (let j = 1; j < n; j++) {
    sol[0][j] = sol[0][j-1] + grid[0][j];
  }

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      sol[i][j] = Math.min(sol[i-1][j], sol[i][j-1]) + grid[i][j];
    }
  }

  return sol[m-1][n-1];
};
