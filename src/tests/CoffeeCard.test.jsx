import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CoffeeCard from "../components/CoffeeCard.jsx";
 
const coffee = {
  id: 1,
  name: "Vanilla bean",
  description: "Medium Roast, nutty flavor",
  origin: "Columbia",
  price: 10,
};
 

function renderCard() {
  render(
    <MemoryRouter>
      <CoffeeCard coffee={coffee} />
    </MemoryRouter>
  );
}
 
describe("CoffeeCard", () => {
  it("shows the coffee's details", () => {
    renderCard();
 
    expect(screen.getByText("Vanilla bean")).toBeInTheDocument();
    expect(screen.getByText("Medium Roast, nutty flavor")).toBeInTheDocument();
    expect(screen.getByText("Columbia")).toBeInTheDocument();
  });
 
  it("formats the price with two decimal places", () => {
    renderCard();
    expect(screen.getByText("$10.00")).toBeInTheDocument();
  });
 
  it("links to that coffee's own page", () => {
    renderCard();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/shop/1");
  });
});