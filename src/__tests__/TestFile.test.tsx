import { render, screen } from "../utils/test-utils"
import TestFile, { sum } from './TestFile.tsx';

it("should sum up 1 + 2 correctly", () => {
    expect(sum(1, 2)).toBe(3)
})

it('should render TestFile correctly', () => {
    render(<TestFile/>)

    const heading = screen.getByRole("heading", {level: 1})
    expect(heading).toBeInTheDocument();

});