import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';
import * as Plot from "@observablehq/plot";
import { HttpClient, HttpResponse } from '@angular/common/http'

@Component({
  selector: 'app-interactable-graph',
  standalone: true,
  templateUrl: './interactable-graph.component.html',
  styleUrls: ['./interactable-graph.component.css']
})
export class InteractableGraphComponent {
  @ViewChild('graph')
  interactableGraph!: ElementRef;

  constructor(private http: HttpClient) {
    
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }

  private fetchData(): any {
    const url = "./data";
    this.http.get(url).subscribe((res: Object) => {
      this.createLineGraph(res);
    })
  }

  private createLineGraph(data: totalReturnData | Object): void {
    let dateParser = d3.utcParse("%Y-%m-%d");
    let format = d3.format(".2%");
    const newPlot = Plot.plot({
      x: {
        label: "Date",
        ticks: '2 years',
      },
      y: {
        label: "Total Return (%)",
        tickFormat: totalReturn => `${format(totalReturn)}`,
        grid: true,
      },
      width: 1248,
      height: 624,
      marginLeft: 60,
      title: "Total Returns Across the Years",
      color: { legend: true},
      marks: [
        Plot.lineY(d3.shuffle(Object.entries(data).map(([key,value]) => (
          {
            "Date": dateParser(`${new Date(key).getUTCFullYear()}-${new Date(key).getUTCMonth() + 1}-${new Date(key).getUTCDate()}`), // Gets date in date string
            "Total Return": value
          }
        ))), {
          x: "Date", y: "Total Return", interval: 'day', sort: "Date", tip: "x",
        }),
        Plot.areaY(d3.shuffle(Object.entries(data).map(([key,value]) => (
          {
            "Date": dateParser(`${new Date(key).getUTCFullYear()}-${new Date(key).getUTCMonth() + 1}-${new Date(key).getUTCDate()}`), // Gets date in date string
            "Total Return": value
          }
        ))), {
          x: "Date", y: "Total Return", interval: 'day', sort: "Date",
        }),
      ]
   })
   this.interactableGraph.nativeElement.append(newPlot);
  }
}

type totalReturnData = {
  date: Date;
  totalReturn: number;
}
