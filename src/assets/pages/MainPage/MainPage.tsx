import './MainPage.scss'
import MainBlock from '../../components/MainBlock/MainBlock'

function MainPage() {
    return (
        <div className='main-page'>
            <MainBlock>
                <div className="Test">основную сумму денег</div>
            </MainBlock>
            <MainBlock>
                <div className="Test3">стату затрат на текущий месяц</div>
            </MainBlock>
            <MainBlock>
                <div className="Test2">Доп режимы работы(раширения для сайта)</div>
            </MainBlock>
        </div>
    )
}

export default MainPage
