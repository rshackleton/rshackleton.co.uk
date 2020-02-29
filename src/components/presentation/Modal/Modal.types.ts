export interface IModalProps {
  children: React.ReactNode;
  visible: boolean;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}
