
(async () => {

  const urlsByHourCanvas = document.getElementById('urls-by-hour');
  const urlsCrawledHourlyChart = new Chart(urlsByHourCanvas, {
    type: 'line',
    data: {
      labels: [...Array(24).keys()],
      datasets: [{
        label: "URLs crawled by hour",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const urlsByUserCanvas = document.getElementById('urls-by-user');
  const byUserChart = new Chart(urlsByUserCanvas, {
    type: 'bar',
    data: {
      // labels: [...stats.top_users.keys()],
      datasets: [{
        label: "Top users",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        }
      },
      indexAxis: 'y',
    }
  });

  const urlsByDomainCanvas = document.getElementById('urls-by-domain');
  const byDomainChart = new Chart(urlsByDomainCanvas, {
    type: 'bar',
    data: {
      // labels: [...stats.top_users.keys()],
      datasets: [{
        label: "Top domains",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        x: {
          beginAtZero: true
        }
      },
      indexAxis: 'y',
    }
  });


  function updateStats() {
    fetch("https://api.mwmbl.org/crawler/stats").then(result => {
      result.json().then(stats => {
        console.log("Stats", stats);

        const urlCountSpan = document.getElementById("num-urls");
        urlCountSpan.innerText = stats.urls_crawled_today;

        urlsCrawledHourlyChart.data.datasets[0].data = stats.urls_crawled_hourly;
        urlsCrawledHourlyChart.update();

        byUserChart.data.labels = Object.keys(stats.top_users);
        byUserChart.data.datasets[0].data = Object.values(stats.top_users);
        byUserChart.update()

        byDomainChart.data.labels = Object.keys(stats.top_domains);
        byDomainChart.data.datasets[0].data = Object.values(stats.top_domains);
        byDomainChart.update()
      })
    });
  }

  updateStats();
  setInterval(() => {
    updateStats();
  }, 5000);

})();
