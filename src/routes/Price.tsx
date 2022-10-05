import {useQuery} from "react-query";
import {fetchCoinHistory} from "../api";
import styled from "styled-components";

interface PriceProps {
    coinId: string | undefined;
}

interface IHistorical {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
export const dateParser = (dateValue: number) => {
    const date = new Date(dateValue);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
};

const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`;
const Section = styled.div``;
const Content = styled.div``;

function Price({coinId}: PriceProps) {
    const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
        fetchCoinHistory(String(coinId))
    );
    console.log(data);
    return (
        <Wrapper>
            <Section>
                {data?.map((value) => (
                    <Content>{dateParser(value.time_open)}</Content>
                ))}
            </Section>
            <Section>
                {data?.map((value) => (
                    <Content>{value.close}</Content>
                ))}
            </Section>
        </Wrapper>
    );
}

export default Price;
