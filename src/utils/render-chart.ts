import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import { Film } from '../types/types';
import { filterWatchedFilmsByTime, getSortingCountGenres } from './stats-utils';


type CtxType = string | CanvasRenderingContext2D | HTMLCanvasElement | ArrayLike<CanvasRenderingContext2D | HTMLCanvasElement>

export type RenderChartType = {watchedFilms: Film[], date: {from: Date, to: Date}}

export const renderChart = (statisticCtx: CtxType, {watchedFilms, date: {from, to}} : RenderChartType): Chart => {
  const filteredFilms = filterWatchedFilmsByTime(watchedFilms, from, to);
  const {genres, counts} = getSortingCountGenres(filteredFilms);

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: genres,
      datasets: [{
        data: counts,
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};
