import './MainPage.scss'
import MainBlock from '../../components/MainBlock/MainBlock'
import UiInput from '../../components/Ui/UiInput/UiInput'
import UiButton from '../../components/Ui/UiButton/UiButton'
import UiModal from '../../components/UiModals/UiModals'
import UiPopover from '../../components/Ui/UiPopover/UiPopover'

// В компоненте:

function MainPage() {
    return (
        <div className="main-page">
            <UiPopover parentElement="#testst" position="down-center" size="m" theme="default">
                <p>Контент поповера</p>
            </UiPopover>
            <UiModal triggerLabel="Открыть" title="Заголовок">
                Контент модалки
            </UiModal>
            <UiInput id="testst"></UiInput>
            <UiButton></UiButton>
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
