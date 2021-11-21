import Header from './Header';
import RenderItem from './RenderItem';
import { makeIcsFile } from '../../shared/ICal';

const Preview = ({data}) => {
    return (
        <div className={"preview"}>
           <Header name={"Превью"} type={"header"} style={{ fontSize: "28px" }}/>
           <div style={{ backgroundColor: "white", borderRadius: "10px", padding: "10px 25px" }}>
           <Header name={data.title} type="eventName"/>
           {data?.data?.map((item) => (
                <RenderItem item={item}/>
           ))}
           </div>
            {data?.start_date &&
            <button
                style={{ padding: "10px", background: "black", color: "white", border: "none", marginTop: "10px" }}
                onClick={() =>
                    makeIcsFile({start: data?.start_date, end: data.end_date}, data.title, data.description)}
            >
                Загрузить в календарь
            </button>
            }
        </div>
    )
}

export default Preview