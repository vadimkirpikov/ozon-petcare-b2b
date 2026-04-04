import os

pages = ['DashboardPage', 'SchedulePage', 'HotelPage', 'GigsPage', 'MarketPage', 'ClientsPage', 'SosPage', 'FinancePage']

os.makedirs('c:/Users/Vadim/WebstormProjects/ozon-petcare-b2b/src/pages', exist_ok=True)
os.makedirs('c:/Users/Vadim/WebstormProjects/ozon-petcare-b2b/src/components/layout', exist_ok=True)
os.makedirs('c:/Users/Vadim/WebstormProjects/ozon-petcare-b2b/src/components/ui', exist_ok=True)

for page in pages:
    with open(f'c:/Users/Vadim/WebstormProjects/ozon-petcare-b2b/src/pages/{page}.js', 'w', encoding='utf-8') as f:
        f.write(f'''import React from 'react';

const {page} = () => {{
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{page.replace('Page', '')}</h1>
      <p>В разработке...</p>
    </div>
  );
}};

export default {page};
''')
