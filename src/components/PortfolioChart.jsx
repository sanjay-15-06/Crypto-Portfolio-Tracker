import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { usePortfolio } from '../context/PortfolioContext';
import { useMemo } from 'react';

const COLORS = ['#6366f1', '#ec4899', '#8b5cf6', '#10b981', '#f59e0b', '#3b82f6'];

export default function PortfolioChart() {
  const { assets, prices } = usePortfolio();

  const data = useMemo(() => {
    return assets.map((asset) => {
      const price = prices[asset.coinId]?.usd || 0;
      return {
        name: asset.coinId.charAt(0).toUpperCase() + asset.coinId.slice(1),
        value: asset.amount * price,
      };
    }).filter(item => item.value > 0);
  }, [assets, prices]);

  if (data.length === 0) {
    return (
      <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
        No chart data available. Add assets to see distribution.
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '300px' }}>
      <h2 style={{ fontSize: '18px', marginBottom: '16px', color: 'var(--text-muted)' }}>Asset Distribution</h2>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
            stroke="var(--bg-color)"
            strokeWidth={2}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
            contentStyle={{ 
              backgroundColor: 'var(--panel-bg)', 
              borderRadius: '8px', 
              border: '1px solid var(--panel-border)',
              backdropFilter: 'blur(10px)',
              color: 'var(--text-main)'
            }}
            itemStyle={{ color: 'var(--text-main)' }}
          />
          <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: 'var(--text-main)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
