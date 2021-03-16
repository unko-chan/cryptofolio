import TradingViewWidget from 'react-tradingview-widget';

export default function TradingWidget() {
  const symbol = 'COINBASE:BTCUSD';

  return (
    <TradingViewWidget
      symbol={symbol}
      allow_symbol_change={false}
      save_image={false}
    />
  );
}
