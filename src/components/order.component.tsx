import { useAuth, useOrder } from "@/hooks";
import { LoginForm } from "./login-form";
import { OrderForm } from "./order-form.component";
import { RegisterForm } from "./register-form";
import { SendPasswordResetEmailForm } from "./send-password-reset-email-form";

export const Order = () => {
  const {
    showForm,
    userName,
    statusText,
    currentRoute,
    handleChangeName,
    handleCreateOrder,
    handleCurrentRoute,
  } = useOrder();

  const {
    form,
    errorMessage,
    setEmail,
    setPassword,
    handleLogin,
    handleLogout,
    handleRegister,
    handleSendPasswordResetEmail,
  } = useAuth();

  const onLogin = async () => {
    try {
      await handleLogin();
      handleCurrentRoute("order");
    } catch (error) {
      console.error(error);
    }
  };

  const onRegister = async () => {
    try {
      await handleRegister();
      handleCurrentRoute("order");
    } catch (error) {
      console.error(error);
    }
  };

  const onSendPasswordResetEmail = async () => {
    try {
      await handleSendPasswordResetEmail();
      handleCurrentRoute("login");
    } catch (error) {
      console.error(error);
    }
  };

  const onLogout = async (event: any) => {
    try {
      event.preventDefault();
      await handleLogout();
      handleCurrentRoute("login");
    } catch (error) {
      console.error(error);
    }
  };

  const routes: Record<string, { title: string; component: any }> = {
    login: {
      title: "Login",
      component: (
        <LoginForm
          errorMessage={errorMessage}
          handleLogin={onLogin}
          setEmail={setEmail}
          setPassword={setPassword}
          form={form}
          handleCurrentRoute={handleCurrentRoute}
        />
      ),
    },
    send_password_reset_email: {
      title: "Recuperar senha",
      component: (
        <SendPasswordResetEmailForm
          handleCurrentRoute={handleCurrentRoute}
          errorMessage={errorMessage}
          handleSendPasswordResetEmail={onSendPasswordResetEmail}
          setEmail={setEmail}
          email={form.email}
        />
      ),
    },
    register: {
      title: "Cadastrar",
      component: (
        <RegisterForm
          errorMessage={errorMessage}
          handleRegister={onRegister}
          setEmail={setEmail}
          setPassword={setPassword}
          form={form}
          handleCurrentRoute={handleCurrentRoute}
        />
      ),
    },
    order: {
      title: "Fazer pedido",
      component: (
        <OrderForm
          onLogout={onLogout}
          statusText={statusText}
          showForm={showForm}
          userName={userName}
          handleChangeName={handleChangeName}
          handleCreateOrder={handleCreateOrder}
        />
      ),
    },
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-end items-end">
      <div className="bg-secondary rounded-xl mb-18 h-[500px] w-[300px] w-max-full me-4 flex flex-col">
        <h1 className="text-2xl text-center font-bold p-3">
          {routes[currentRoute].title}
        </h1>
        {routes[currentRoute].component}
      </div>
    </div>
  );
};
