import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import AdminPortal from "../pages/AdminPortal.jsx";
 
beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve({ id: 3 }) })
  );
});
 
describe("Admin portal form", () => {
  it("complains about empty fields instead of posting", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><AdminPortal /></MemoryRouter>);
 
    await user.click(screen.getByRole("button", { name: "Add coffee" }));
 
    expect(screen.getByText("Give the coffee a name.")).toBeInTheDocument();
    expect(screen.getByText("Tell us where this coffee comes from.")).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });
 
  it("rejects a price that isn't a positive number", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><AdminPortal /></MemoryRouter>);
 
    await user.type(screen.getByLabelText("Coffee Name"), "Morning Roast");
    await user.type(screen.getByLabelText("Description"), "Light and fruity");
    await user.type(screen.getByLabelText("Origin"), "Kenya");
    await user.type(screen.getByLabelText("Price"), "-4");
 
    await user.click(screen.getByRole("button", { name: "Add coffee" }));
 
    expect(screen.getByText("Price has to be a number above zero.")).toBeInTheDocument();
  });
 
  it("posts the new coffee when everything is filled in", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><AdminPortal /></MemoryRouter>);
 
    await user.type(screen.getByLabelText("Coffee Name"), "Morning Roast");
    await user.type(screen.getByLabelText("Description"), "Light and fruity");
    await user.type(screen.getByLabelText("Origin"), "Kenya");
    await user.type(screen.getByLabelText("Price"), "9.5");
 
    await user.click(screen.getByRole("button", { name: "Add coffee" }));
 
    expect(global.fetch).toHaveBeenCalledTimes(1);
 

    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toContain("/coffee");
    expect(options.method).toBe("POST");
    expect(JSON.parse(options.body)).toEqual({
      name: "Morning Roast",
      description: "Light and fruity",
      origin: "Kenya",
      price: 9.5,
    });
  });
});