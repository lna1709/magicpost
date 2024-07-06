import '../styles/nicepage.css'
import '../styles/Landing-1.css'
import Img1 from '../images/industrial-port-container-yard_1.jpg'
import Img2 from '../images/truck-vehicle-with-trailers-back.jpg'
import Img3 from '../images/aerial-view-container-cargo-ship.jpg'
import Img4 from '../images/2087858-e6b7c80f.png'
import Img5 from '../images/561127-a5e550d6.png'
import Img6 from '../images/126509-436d588e.png'
import { Link } from 'react-router-dom'

const Page = (props) => {

    const { handleManagement, handleSearch } = props;

    return <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="keywords" content="On Top of the World, financial success" />
        <meta name="description" content="" />
        <title>Landing 1</title>
        <link rel="stylesheet" href="../styles/nicepage.css" media="screen" />
        <link rel="stylesheet" href="../styles/Landing-1.css" media="screen" />
        <meta name="generator" content="Nicepage 6.2.4, nicepage.com" />
        <meta name="referrer" content="origin" />
        <link
            id="u-theme-google-font"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Montserrat:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i"
        />
        <link
            id="u-page-google-font"
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i|Biryani:200,300,400,600,700,800,900"
        />
        <meta name="theme-color" content="#4345e7" />
        <meta property="og:title" content="Landing 1" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/" />
        <meta data-intl-tel-input-cdn-path="intlTelInput/" />
        <header className="u-clearfix u-header u-header" id="sec-3cd6">
            <div className="u-clearfix u-sheet u-sheet-1">
                <h4
                    className="u-text u-text-palette-3-base u-text-1"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                    data-animation-delay={500}
                >
                    {" "}
                    Magic​​post
                </h4>
                <div className='' style={{ display: "flex", gap: "-100px" }}>
                    <Link
                        to={"/management"}
                        className="u-btn u-button-style u-btn-1"
                    >
                        <button onClick={handleSearch} style={{ background: "transparent", border: "none" }}>Truy cập vào trang tìm kiếm đơn vận</button>
                    </Link>
                    <Link
                        to={"/management"}
                        className="u-btn u-button-style u-btn-1"
                    >
                        <button onClick={handleManagement} style={{ background: "transparent", border: "none" }}>Truy cập vào trang cho công nhân viên chức công ty</button>
                    </Link>
                </div>
            </div>
        </header>
        <section
            className="u-clearfix u-container-align-center-sm u-image u-section-1"
            id="carousel_72e0"
            data-image-width={1980}
            data-image-height={1320}
        >
            <div className="u-clearfix u-sheet u-sheet-1">
                <div
                    className="custom-expanded u-palette-3-base u-shape u-shape-rectangle u-shape-1"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                    data-animation-delay={250}
                />
                <div
                    className="u-container-align-left u-container-style u-group u-white u-group-1"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                    data-animation-delay={500}
                >
                    <div className="u-container-layout u-container-layout-1">
                        <h4
                            className="u-text u-text-palette-3-base u-text-1"
                            data-animation-name="customAnimationIn"
                            data-animation-duration={1500}
                            data-animation-delay={500}
                        >
                            {" "}
                            Magic​​post
                        </h4>
                        <h1
                            className="u-text u-text-black u-text-2"
                            data-animation-name="customAnimationIn"
                            data-animation-duration={1500}
                            data-animation-delay={750}
                        >
                            {" "}
                            Khách hàng trên hết
                            <br />
                            Đổi mới không ngừng
                        </h1>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="u-align-center u-clearfix u-container-align-center-lg u-container-align-center-md u-container-align-center-xl u-container-align-center-xs u-grey-10 u-section-3"
            id="carousel_f25f"
        >
            <div className="u-expanded-width u-palette-3-base u-shape u-shape-rectangle u-shape-1" />
            <h2
                className="u-align-center u-text u-text-body-alt-color u-text-default-lg u-text-default-md u-text-default-xl u-text-1"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
            >
                Kết nối mọi nơi
            </h2>
            <p
                className="u-align-center u-text u-text-body-alt-color u-text-2"
                data-animation-name="customAnimationIn"
                data-animation-duration={1500}
                data-animation-delay={250}
            >
                Kết nối mọi người qua từng chuyến hàng, mang lại sự tiện lợi và hiệu quả,
                tạo nên những mối liên kết vững chắc trong chuỗi cung ứng
            </p>
            <div className="u-list u-list-1">
                <div className="u-repeater u-repeater-1">
                    <div
                        className="u-align-center u-container-style u-list-item u-repeater-item u-white u-list-item-1"
                        data-animation-name="customAnimationIn"
                        data-animation-duration={1500}
                        data-animation-delay={500}
                    >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                            <img
                                src={Img1}
                                alt=""
                                className="u-expanded-width u-image u-image-default u-image-1"
                                data-image-width={1380}
                                data-image-height={951}
                            />
                            <h3 className="u-text u-text-3">Chiến lược phát triển</h3>
                            <p className="u-text u-text-grey-50 u-text-4">
                                {" "}
                                Chúng tôi không chỉ dừng lại ở việc vận chuyển hàng hóa. Mỗi bước
                                tiến, mỗi quyết định đều dựa trên chiến lược phát triển toàn diện,
                                nhằm mở rộng mạng lưới, nâng cao chất lượng dịch vụ và tối ưu hóa
                                hiệu suất.
                            </p>
                        </div>
                    </div>
                    <div
                        className="u-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-2"
                        data-animation-name="customAnimationIn"
                        data-animation-duration={1500}
                        data-animation-delay={500}
                    >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                            <img
                                src={Img2}
                                alt=""
                                className="u-expanded-width u-image u-image-default u-image-2"
                                data-image-width={1380}
                                data-image-height={920}
                            />
                            <h3 className="u-text u-text-5"> Luôn dẫn đầu</h3>
                            <p className="u-text u-text-grey-50 u-text-6">
                                {" "}
                                &nbsp;Trong thị trường logistics đầy cạnh tranh, chúng tôi tự hào
                                là người dẫn đầu, đặt ra tiêu chuẩn cho ngành và không ngừng nâng
                                cao giá trị cho khách hàng.
                            </p>
                        </div>
                    </div>
                    <div
                        className="u-align-center u-container-style u-list-item u-repeater-item u-video-cover u-white u-list-item-3"
                        data-animation-name="customAnimationIn"
                        data-animation-duration={1500}
                        data-animation-delay={500}
                    >
                        <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                            <img
                                src={Img3}
                                alt=""
                                className="u-expanded-width u-image u-image-default u-image-3"
                                data-image-width={1380}
                                data-image-height={919}
                            />
                            <h3 className="u-text u-text-7">Động lực đổi mới</h3>
                            <p className="u-text u-text-grey-50 u-text-8">
                                {" "}
                                Chúng tôi không ngừng tìm kiếm, thử nghiệm và triển khai các giải
                                pháp logistics sáng tạo, nhằm đáp ứng nhanh chóng và linh hoạt nhu
                                cầu ngày càng phức tạp của khách hàng. Đổi mới không chỉ giúp
                                chúng tôi tiến lên phía trước, mà còn là động lực để chúng tôi
                                vượt qua mọi thách thức.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="u-align-center u-clearfix u-container-align-center u-white u-section-4"
            id="carousel_1493"
        >
            <div
                className="u-expanded-width u-grey-10 u-shape u-shape-rectangle u-shape-1"
                data-animation-name="flipIn"
                data-animation-duration={1500}
                data-animation-delay={500}
                data-animation-direction="X"
            />
            <div className="data-layout-selected u-clearfix u-gutter-0 u-layout-wrap u-layout-wrap-1">
                <div className="u-layout" style={{}}>
                    <div className="u-layout-row" style={{}}>
                        <div
                            className="u-align-center u-container-style u-image u-layout-cell u-left-cell u-size-30-lg u-size-30-xl u-size-60-md u-size-60-sm u-size-60-xs u-size-xs-60 u-image-1"
                            src=""
                            data-animation-name="customAnimationIn"
                            data-animation-duration={1500}
                            data-animation-delay={500}
                            data-image-width={1380}
                            data-image-height={920}
                        >
                            <div
                                className="u-container-layout u-valign-top u-container-layout-1"
                                src=""
                            />
                        </div>
                        <div
                            className="u-align-left u-container-align-left u-container-style u-layout-cell u-right-cell u-size-30-lg u-size-30-xl u-size-60-md u-size-60-sm u-size-60-xs u-size-xs-60 u-white u-layout-cell-2"
                            data-animation-name="customAnimationIn"
                            data-animation-duration={1500}
                        >
                            <div className="u-container-layout u-container-layout-2">
                                <h4
                                    className="u-align-left u-text u-text-1"
                                    data-animation-name="customAnimationIn"
                                    data-animation-duration={1500}
                                    data-animation-delay={500}
                                >
                                    {" "}
                                    Magicpost
                                </h4>
                                <h3 className="u-align-left u-text u-text-2">
                                    Dẫn đầu ngành công nghiệp vận chuyển và kết nối mọi người
                                </h3>
                                <p className="u-align-left u-text u-text-3">
                                    {" "}
                                    Chúng tôi không chỉ dẫn đầu trong ngành công nghiệp vận chuyển,
                                    mà còn tạo ra những cầu nối vững chắc, kết nối mọi người trên
                                    toàn thế giới thông qua từng chuyến hàng, mang lại sự thuận tiện
                                    và hiệu quả cho mọi khách hàn
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="u-align-center-sm u-align-center-xs u-clearfix u-container-align-center u-section-5"
            id="carousel_4134"
        >
            <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
                <div className="data-layout-selected u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
                    <div className="u-layout" style={{}}>
                        <div className="u-layout-row" style={{}}>
                            <div
                                className="u-align-left u-container-align-center-lg u-container-align-center-xl u-container-align-left-md u-container-align-left-sm u-container-align-left-xs u-container-style u-layout-cell u-left-cell u-size-23-lg u-size-23-xl u-size-60-md u-size-60-sm u-size-60-xs u-size-xs-60 u-layout-cell-1"
                                src=""
                            >
                                <div
                                    className="u-container-layout u-valign-middle-md u-valign-middle-sm u-valign-middle-xl u-valign-middle-xs u-container-layout-1"
                                    src=""
                                >
                                    <div
                                        className="custom-expanded u-image u-image-circle u-image-1"
                                        data-image-width={1920}
                                        data-image-height={1080}
                                        data-animation-name="customAnimationIn"
                                        data-animation-duration={1500}
                                        data-animation-delay={750}
                                    />
                                </div>
                            </div>
                            <div
                                className="u-align-left u-container-style u-layout-cell u-right-cell u-shape-rectangle u-size-37-lg u-size-37-xl u-size-60-md u-size-60-sm u-size-60-xs u-size-xs-60 u-layout-cell-2"
                                data-animation-name="customAnimationIn"
                                data-animation-duration={1500}
                                data-animation-delay={500}
                            >
                                <div className="u-container-layout u-container-layout-2">
                                    <span className="u-file-icon u-icon u-text-palette-3-base u-icon-1">
                                        <img src={Img4} alt="" />
                                    </span>
                                    <p className="u-large-text u-text u-text-default u-text-variant u-text-1">
                                        {" "}
                                        Giá trị của chúng tôi là bản sắc riêng. Văn hóa của chúng tôi
                                        là điểm đặc biệt. Chiến lược của chúng tôi là động lực thúc
                                        đẩy. Tại công ty chúng tôi, khách hàng luôn được ưu tiên, con
                                        người là trọng tâm và sự sáng tạo là động lực dẫn dắt chúng tôi.
                                    </p>
                                    <h3 className="u-custom-font u-text u-text-2">
                                        Mr. Tran Manh Dung
                                    </h3>
                                    <p className="u-text u-text-grey-30 u-text-3">
                                        {" "}
                                        CEO and Co-Founder
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section
            className="u-align-center u-clearfix u-container-align-right-lg u-container-align-right-xl u-image u-section-6"
            id="carousel_9a45"
            data-image-width={1980}
            data-image-height={1110}
        >
            <div className="u-clearfix u-sheet u-sheet-1" />
        </section>
        <section
            className="u-align-center u-clearfix u-container-align-center u-image u-shading u-section-7"
            id="carousel_3311"
            data-image-width={1980}
            data-image-height={1114}
        >
            <div className="u-clearfix u-sheet u-sheet-1">
                <h2
                    className="u-align-center u-text u-text-default u-text-palette-3-base u-text-1"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                    data-animation-delay={500}
                >
                    Liên lạc với chúng tôi
                </h2>
                <div
                    className="u-align-center u-border-5 u-border-palette-3-base u-line u-line-horizontal u-line-1"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                />
                <p
                    className="u-align-center u-text u-text-2"
                    data-animation-name="customAnimationIn"
                    data-animation-duration={1500}
                    data-animation-delay={500}
                >
                    Liên lạc với chúng tôi mọi lúc - mọi nơi - mọi trường hợp
                    <br />
                    Đội ngũ nhân viên sẽ luôn luôn hỗ trơ bạn tốt nhất có thể
                </p>
                <div className="u-expanded-width u-list u-list-1">
                    <div className="u-repeater u-repeater-1">
                        <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-1">
                            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                                <span className="u-align-center u-icon u-icon-circle u-palette-3-base u-text-white u-icon-1">
                                    <svg
                                        className="u-svg-link"
                                        preserveAspectRatio="xMidYMin slice"
                                        viewBox="0 0 512 512"
                                        style={{}}
                                    >
                                        <use xlinkHref="#svg-36d8" />
                                    </svg>
                                    <svg
                                        className="u-svg-content"
                                        viewBox="0 0 512 512"
                                        x="0px"
                                        y="0px"
                                        id="svg-36d8"
                                        style={{ enableBackground: "new 0 0 512 512" }}
                                    >
                                        <g>
                                            <g>
                                                <path d="M256,0C156.748,0,76,80.748,76,180c0,33.534,9.289,66.26,26.869,94.652l142.885,230.257    c2.737,4.411,7.559,7.091,12.745,7.091c0.04,0,0.079,0,0.119,0c5.231-0.041,10.063-2.804,12.75-7.292L410.611,272.22    C427.221,244.428,436,212.539,436,180C436,80.748,355.252,0,256,0z M384.866,256.818L258.272,468.186l-129.905-209.34    C113.734,235.214,105.8,207.95,105.8,180c0-82.71,67.49-150.2,150.2-150.2S406.1,97.29,406.1,180    C406.1,207.121,398.689,233.688,384.866,256.818z" />
                                            </g>
                                        </g>
                                        <g>
                                            <g>
                                                <path d="M256,90c-49.626,0-90,40.374-90,90c0,49.309,39.717,90,90,90c50.903,0,90-41.233,90-90C346,130.374,305.626,90,256,90z     M256,240.2c-33.257,0-60.2-27.033-60.2-60.2c0-33.084,27.116-60.2,60.2-60.2s60.1,27.116,60.1,60.2    C316.1,212.683,289.784,240.2,256,240.2z" />
                                            </g>
                                        </g>
                                    </svg>
                                </span>
                                <h5 className="u-align-center u-text u-text-body-color u-text-default u-text-3">
                                    Địa chỉ
                                </h5>
                                <p className="u-align-center u-text u-text-4">
                                    144 Xuân Thủy, Dịch Vọng Hậu,
                                    <br />
                                    Cầu Giấy, Hà Nội
                                </p>
                            </div>
                        </div>
                        <div className="u-container-align-center u-container-style u-list-item u-repeater-item u-white u-list-item-2">
                            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                                <span className="u-align-center u-file-icon u-icon u-icon-circle u-palette-3-base u-text-white u-icon-2">
                                    <img src={Img5} alt="" />
                                </span>
                                <h5 className="u-align-center u-text u-text-body-color u-text-default u-text-5">
                                    {" "}
                                    Email:
                                </h5>
                                <p className="u-align-center u-text u-text-6">
                                    <a
                                        className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-black u-btn-1"
                                        href="https://nicepage.com"
                                    >
                                        manhdungtran.vnuuet@company.com
                                        <br />
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="u-container-style u-list-item u-repeater-item u-white u-list-item-3">
                            <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                                <span className="u-align-center u-file-icon u-icon u-icon-circle u-palette-3-base u-text-white u-icon-3">
                                    <img src={Img6} alt="" />
                                </span>
                                <h5 className="u-align-center u-text u-text-body-color u-text-default u-text-7">
                                    Call us:
                                </h5>
                                <p className="u-align-center u-text u-text-8">0827912858</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <footer
            className="u-align-center u-clearfix u-footer u-grey-80 u-footer"
            id="sec-f456"
        >
            <div className="u-clearfix u-sheet u-sheet-1">
                <p className="u-small-text u-text u-text-palette-3-base u-text-variant u-text-1">
                    MAGICPOST - NỀN TẢNG LOGISTICS THẾ HỆ MỚI HÀNG ĐẦU VIỆT NAM
                </p>
            </div>
        </footer>
    </>

}

export default Page