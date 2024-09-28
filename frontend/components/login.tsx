"use client";

import { useState } from "react";
import authenticate from "@/lib/actions/authenticate";

function LoginForm() {
  // Локальные состояния для ошибки, загрузки и действия формы
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState<boolean>(false);

  // Функция для отправки формы
  const formAction = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    setIsPending(true); 

    // Получаем данные формы
    const formData = new FormData(event.currentTarget);

    try {
      const error = await authenticate(undefined, formData);

      if (error) {
        setErrorMessage(error);
      } else {
        setErrorMessage(null);
      }
    } catch (error) {
      setErrorMessage("An unexpected error occurred");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={formAction}>
      {/* Поля формы */}
      <input type="text" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Password" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </button>

      {/* Сообщение об ошибке */}
      {errorMessage && <p className="error">{errorMessage}</p>}
    </form>
  );
}

export default LoginForm;
