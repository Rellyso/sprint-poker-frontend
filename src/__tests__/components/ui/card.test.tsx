import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

describe("Componente Card", () => {
  it("renderiza o card com as classes padrão", () => {
    render(<Card data-testid="card">Conteúdo</Card>);
    expect(screen.getByTestId("card")).toHaveClass(
      "rounded-lg border bg-card text-card-foreground shadow-sm"
    );
  });

  it("renderiza o card com classes personalizadas", () => {
    render(<Card data-testid="card" className="custom-class">Conteúdo personalizado</Card>);
    expect(screen.getByTestId("card")).toHaveClass(
      "rounded-lg border bg-card text-card-foreground shadow-sm custom-class"
    );
  });
});

describe("Componente CardHeader", () => {
  it("renderiza o cabeçalho do card com as classes padrão", () => {
    render(<CardHeader data-testid="card-header">Conteúdo do cabeçalho</CardHeader>);
    expect(screen.getByTestId("card-header")).toHaveClass("flex flex-col space-y-1.5 p-6");
  });

  it("renderiza o cabeçalho do card com classes personalizadas", () => {
    render(<CardHeader data-testid="card-header" className="custom-header">Cabeçalho personalizado</CardHeader>);
    expect(screen.getByTestId("card-header")).toHaveClass("flex flex-col space-y-1.5 p-6 custom-header");
  });
});

describe("Componente CardTitle", () => {
  it("renderiza o título do card com as classes padrão", () => {
    render(<CardTitle>Título do card</CardTitle>);
    expect(screen.getByText("Título do card")).toHaveClass("text-2xl font-semibold leading-none tracking-tight");
  });

  it("renderiza o título do card com classes personalizadas", () => {
    render(<CardTitle className="custom-title">Título personalizado</CardTitle>);
    expect(screen.getByText("Título personalizado")).toHaveClass("text-2xl font-semibold leading-none tracking-tight custom-title");
  });
});

describe("Componente CardDescription", () => {
  it("renderiza a descrição do card com as classes padrão", () => {
    render(<CardDescription>Descrição do card</CardDescription>);
    expect(screen.getByText("Descrição do card")).toHaveClass("text-sm text-muted-foreground");
  });

  it("renderiza a descrição do card com classes personalizadas", () => {
    render(<CardDescription className="custom-description">Descrição personalizada</CardDescription>);
    expect(screen.getByText("Descrição personalizada")).toHaveClass("text-sm text-muted-foreground custom-description");
  });
});

describe("Componente CardContent", () => {
  it("renderiza o conteúdo do card com as classes padrão", () => {
    render(<CardContent data-testid="card-content">Conteúdo do card</CardContent>);
    expect(screen.getByTestId("card-content")).toHaveClass("p-6 pt-0");
  });

  it("renderiza o conteúdo do card com classes personalizadas", () => {
    render(<CardContent data-testid="card-content" className="custom-content">Conteúdo personalizado</CardContent>);
    expect(screen.getByTestId("card-content")).toHaveClass("p-6 pt-0 custom-content");
  });
});

describe("Componente CardFooter", () => {
  it("renderiza o rodapé do card com as classes padrão", () => {
    render(<CardFooter data-testid="card-footer">Rodapé do card</CardFooter>);
    expect(screen.getByTestId("card-footer")).toHaveClass("flex items-center p-6 pt-0");
  });

  it("renderiza o rodapé do card com classes personalizadas", () => {
    render(<CardFooter data-testid="card-footer" className="custom-footer">Rodapé personalizado</CardFooter>);
    expect(screen.getByTestId("card-footer")).toHaveClass("flex items-center p-6 pt-0 custom-footer");
  });
});