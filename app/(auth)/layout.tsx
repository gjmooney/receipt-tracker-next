import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="flex h-full items-center justify-center">{children}</div>
  );
};

export default layout;
