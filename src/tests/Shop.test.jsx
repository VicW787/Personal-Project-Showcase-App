import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Shop from "../pages/Shop.jsx";
 
const coffees = [
  { id: 1, name: "Vanilla bean", description: "Medium Roast, nutty flavor", origin: "Columbia", price: 10 },
  { id: 2, name: "House Blend", description: "Dark Roast, Rich flavor", origin: "Vietnam", price: 12 },
];
 

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(coffees) })
  );
});
 
describe("Shop page", () => {
  it("lists every coffee once the data arrives", async () => {
    render(<MemoryRouter><Shop /></MemoryRouter>);
 
    // findBy waits for the fetch to finish. getBy would fail straight away.
    expect(await screen.findByText("Vanilla bean")).toBeInTheDocument();
    expect(screen.getByText("House Blend")).toBeInTheDocument();
  });
 
  it("narrows the list as the user types in the search box", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Shop /></MemoryRouter>);
 
    await screen.findByText("Vanilla bean");
    await user.type(screen.getByLabelText("Search coffee"), "house");
 
    expect(screen.getByText("House Blend")).toBeInTheDocument();
    expect(screen.queryByText("Vanilla bean")).not.toBeInTheDocument();
  });
 
  it("filters by origin when a checkbox is ticked", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><Shop /></MemoryRouter>);
 
    await screen.findByText("Vanilla bean");
    await user.click(screen.getByLabelText("Vietnam"));
 
    expect(screen.getByText("House Blend")).toBeInTheDocument();
    expect(screen.queryByText("Vanilla bean")).not.toBeInTheDocument();
  });
});