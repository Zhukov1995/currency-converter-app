import './footer.scss';

const Footer = () => {
    const date = new Date().getFullYear();
    return (
        <footer>
            <div className='footer'>
                <span className='copyright'>&copy; Все права защищены {date}</span>
                <div className='contacts'>
                    <span><strong>Контакты:</strong></span><br />
                    <span>Телефон: <a href='tel:+79776499526'>+7 (977) 649-95-26</a></span><br />
                    <span>Почта: <a href='mailto:ro.zhuckov2013@yandex.ru'>ro.zhuckov2013@yandex.ru</a></span>
                </div>
            </div>
        </footer>
    )
}

export default Footer;