import TradingViewWidget from 'react-tradingview-widget';

export default function TradingWidget(props) {
  const symbol = `COINBASE:${props.symbol}USD`

  return (
    <TradingViewWidget
      symbol={symbol}
      allow_symbol_change={false}
      save_image={false}
    />
  );
}