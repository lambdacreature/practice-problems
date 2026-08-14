// problem: https://leetcode.com/problems/generate-parentheses/description/

function generateParenthesis(n: number): string[] {
  const canOpen = n;
  const canClose = 0;
  const initState: string[] = [];
  const foundStates: string[] = [];
  generateFurther(
    canOpen,
    canClose,
    initState,
    foundStates,
  );

  return foundStates;
}

function generateFurther(
  canOpen: number,
  canClose: number,
  currentState: string[],
  foundStates: string[],
): void {
  if (canOpen == 0 && canClose == 0) {
    foundStates.push(currentState.join(""));
    return; 
  }

  if (canOpen) {
    currentState.push("(");
    generateFurther(
      canOpen-1,
      canClose+1,
      currentState,
      foundStates,
    );
    currentState.pop();
  }

  if (canClose) {
    currentState.push(")");
    generateFurther(
      canOpen,
      canClose-1,
      currentState,
      foundStates,
    )
    currentState.pop();
  }
}
