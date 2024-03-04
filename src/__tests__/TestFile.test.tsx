import {render, screen, userEvent} from "../utils/test-utils"
import {vi} from "vitest";
import DoughnutChart from "../components/charts/DoughnutChart.tsx";
import Backdrop from "../components/Layout/Backdrop.tsx";
import SubmitBtn from "../components/Form/SubmitBtn.tsx";
import NewProjectButton from "../components/Projects/NewProjectButton.tsx";
import plus from '../assets/Icons/plus.svg'

describe("Component Doughnut Chart", () => {
    it('renders DoughnutChart correctly', () => {
        render(
            <DoughnutChart
                labels={['Label1', 'Label2']}
                chartData={[30, 70]}
                arkColors={['#FF5733', '#33FF57']}
            />
        );
    });
})

describe("Component Backdrop", () => {
    it('renders Backdrop correctly', () => {
        const onClickMock = vi.fn();

        render(<Backdrop isVisible={true} onClick={onClickMock}/>);

        // ASSERT
        const backdrop = screen.getByRole('presentation');
        expect(backdrop).toHaveClass('backdrop-visible');
    });

    it('gets callback triggered', async () => {
        const onClickMock = vi.fn();

        render(<Backdrop isVisible={true} onClick={onClickMock}/>);

        // ACT
        const backdrop = screen.getByRole('presentation');
        await userEvent.click(backdrop!);

        // ASSERT
        expect(onClickMock).toHaveBeenCalled();
    });
})

describe('Component SubmitBtn', () => {
    it('renders without error message', () => {
        const {getByText, queryByText} = render(
            <SubmitBtn buttonText="Submit"/>
        );

        // ASSERT
        const submitButton = getByText('Submit');
        const errorMessage = queryByText(/error message/i);

        expect(submitButton).toBeInTheDocument();
        expect(errorMessage).not.toBeInTheDocument();
    });

    it('renders with error message', () => {
        const {getByText} = render(
            <SubmitBtn buttonText="Submit" error="This is an error message"/>
        );

        // ASSERT
        const submitButton = getByText('Submit');
        const errorMessage = getByText('This is an error message');

        expect(submitButton).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });
})

describe("Component NewProjectButton", () => {
    it('clicks correctly', async () => {
        // ARRANGE
        userEvent.setup()
        const handleClick = vi.fn();

        render(
            <NewProjectButton
                onClick={handleClick}
            />
        );

        // ACT
        const button = screen.getByRole("button");
        await userEvent.click(button)

        // ASSERT
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders plus icon correctly', () => {
        // ARRANGE
        const onClickMock = vi.fn();

        // ACT
        render(<NewProjectButton onClick={onClickMock} />);

        // ASSERT
        const plusIcon = screen.getByAltText('Add');
        expect(plusIcon).toBeInTheDocument();
        expect(plusIcon).toHaveAttribute('src', plus);
    });
})
