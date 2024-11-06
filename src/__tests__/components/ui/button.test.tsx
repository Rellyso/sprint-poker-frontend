import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Componente Button", () => {
  it("renderiza o botão com os estilos padrão", () => {
    render(<Button>Clique em mim</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    );
  });

  it("renderiza o botão com estilos personalizados", () => {
    render(<Button className="custom-class">Clique em mim</Button>);
    expect(screen.getByRole("button")).toHaveClass(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 custom-class"
    );
  });

  it("renderiza o botão com estilos de variante", () => {
    render(<Button variant="destructive">Clique em mim</Button>);
    expect(screen.getByRole("button")).toHaveClass("bg-destructive text-destructive-foreground hover:bg-destructive/90");
  });

  it("renderiza o botão com estilos de tamanho", () => {
    render(<Button size="lg">Clique em mim</Button>);
    expect(screen.getByRole("button")).toHaveClass("h-11 rounded-md px-8");
  });

  it("renderiza o botão com a propriedade asChild", () => {
    render(<Button asChild><span>Clique em mim</span></Button>);

    const spanElement = screen.getByText("Clique em mim");
    expect(spanElement).toHaveClass(
      "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    );

    expect(spanElement.closest("span")).not.toHaveRole("button");
  });
});