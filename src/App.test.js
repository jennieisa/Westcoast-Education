import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
});

describe("App component", () => {

  describe("Routing", () => {

    const setUp = () => render(<App />);

    it("should navigate and rendering correct component", async () => {

      setUp();
      const user = userEvent.setup();

    })

  })
})