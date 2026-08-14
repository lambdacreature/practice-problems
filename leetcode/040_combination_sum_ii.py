class Solution:
    def combinationSum2(self, candidates: List[int], target: int) -> List[List[int]]:
        valid_candidates = list(filter(lambda c: c <= target, candidates))
        candidate_dict = { c: valid_candidates.count(c) for c in valid_candidates }
        unique_candidates = [ c for c in set(valid_candidates) ]

        valid_combinations = set()
        combination = []

        def backtrack(i, total): 
            if (total == target):
                valid_combinations.add(tuple(n for n in sorted(combination)))

            if (total > target or i >= len(unique_candidates)):
                return

            backtrack(i+1, total)
            c = unique_candidates[i]
            for times in range(1, candidate_dict[c]+1):
                combination.append(c)
                backtrack(i+1, total + c*times)

            for _ in range(candidate_dict[c]):
                combination.pop()

        backtrack(0, 0)

        return [list(c) for c in valid_combinations]
