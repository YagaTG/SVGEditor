interface IModalWindow {
  closeFunc: React.Dispatch<React.SetStateAction<boolean>>;
  closeFuncs: React.Dispatch<React.SetStateAction<boolean>>[];
  children: React.ReactNode;
}

import "./style.scss";

export const ModalWindow = ({
  closeFuncs = [],
  closeFunc,
  children,
}: IModalWindow) => {
  return (
    <div
      className="modal"
      onClick={() =>
        closeFuncs.length > 0
          ? closeFuncs.map((closeFunc) => closeFunc(false))
          : closeFunc(false)
      }
    >
      {children}
    </div>
  );
};
