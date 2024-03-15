fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    const originalData = data;
    const renderTable = (data) => {
      const table = document.createElement('table');
      data.forEach(element => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${element.id}</td>
          <td><img src="${element.image}" alt="${element.id}" style="width: 50px;"></td>
          <td>${element.symbol}</td>
          <td>${element.current_price}</td>
          <td>${element.total_volume}</td>
          <td>${element.market_cap}</td>
          <td>${element.price_change_percentage_24h}</td>
        `;
        table.appendChild(row);
      });
      table.style.margin = '0 auto';
      document.body.appendChild(table);
    };
    renderTable(originalData);
    const handleSearch = () => {
      const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
      const filteredData = originalData.filter(item =>
        item.id.toLowerCase().includes(searchTerm) ||
        item.symbol.toLowerCase().includes(searchTerm)
      );
      document.body.removeChild(document.querySelector('table'));
      renderTable(filteredData);
    };
    document.getElementById('searchButton').addEventListener('click', handleSearch);
    const sortByMarketCap = () => {
      originalData.sort((a, b) => b.market_cap - a.market_cap);
      document.body.removeChild(document.querySelector('table'));
      renderTable(originalData);
    };
    const sortByPercentageChange = () => {
      originalData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      document.body.removeChild(document.querySelector('table'));
      renderTable(originalData);
    };
    document.getElementById('sortByMarketCap').addEventListener('click', sortByMarketCap);
    document.getElementById('sortByPercentageChange').addEventListener('click', sortByPercentageChange);
  })
  .catch(error => console.error('Error:', error));