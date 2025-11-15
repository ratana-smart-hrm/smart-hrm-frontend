const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className=" p-8 w-full max-w-lg">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;