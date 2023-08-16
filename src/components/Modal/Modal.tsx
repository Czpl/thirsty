import './Modal.scss';

type ChildComponent = string | JSX.Element | JSX.Element[];

interface IModalProps {
  isOpen: boolean;
  setIsOpen: (bool: boolean) => void;
  children: ChildComponent
}

function Modal(props: IModalProps) {

  if(!props.isOpen) return null;
  return (
    <div className="modalContainer" onClick={() => props.setIsOpen(false)}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {props.children} 
      </div>
    </div>
  )
}

export default Modal;