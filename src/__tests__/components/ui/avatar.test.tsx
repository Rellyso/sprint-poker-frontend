import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // ajuste o caminho conforme a estrutura do seu projeto

describe("Componente Avatar", () => {

  it("deve renderizar o AvatarFallback quando a imagem está ausente", () => {
    render(
      <Avatar>
        <AvatarImage src="" alt="User Image" />
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
    );

    const avatarFallback = screen.getByText("U");
    expect(avatarFallback).toBeInTheDocument();
  });
});