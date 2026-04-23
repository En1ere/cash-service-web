import './MainBlock.scss'

type Props = {
  children: React.ReactNode;
};

function MainBlock({ children }: Props) {
  return (
    <div className="main-block">
        {children}
    </div>
  );
}

export default MainBlock;
