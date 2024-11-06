import { describe, it, vi, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { useAuth } from "@/hooks/use-auth";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Header } from "@/components/header";
import userEvent from "@testing-library/user-event";

// Mock da navegação e do hook de autenticação
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

vi.mock("@/hooks/use-auth");

describe("Header component", () => {
  const mockSignOut = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      session: { user: { name: "John Doe" } },
      signOut: mockSignOut,
    });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it("deve renderizar o nome do usuário", () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("deve renderizar o fallback do avatar com a inicial do nome", () => {
    render(<Header />, { wrapper: MemoryRouter });
    expect(screen.getByText("J")).toBeInTheDocument();
  });

  it("deve chamar signOut e navegar para /login ao clicar em 'Sair'", async () => {
    const user = userEvent.setup();
    render(<Header />, { wrapper: MemoryRouter });

    const triggerButton = screen.getByRole("button", { name: /John Doe/i });
    await user.click(triggerButton);

    const signOutButton = await screen.findByText("Sair");

    await user.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});