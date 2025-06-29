import { Component } from '@angular/core';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  header = [];
  userData: any;
  name = '@olivia';

constructor(private dash:DashService) {}

     ngAfterViewInit() {
    this.drawChart();
    this.tabledata();
  }

  drawChart() {
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // stacked values (bottom to top)
    const low =   [20, 25, 22, 18, 24, 20, 19, 21, 23, 28, 30, 22];
    const mid =   [15, 20, 18, 15, 20, 18, 17, 18, 19, 22, 24, 20];
    const high =  [10, 15, 12, 10, 14, 12, 11, 12, 14, 18, 20, 15];

    const barWidth = 30;
    const gap = 25;
    const xOffset = 40;
    const chartHeight = 200;
    const maxValue = 100;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '12px Arial';

    for (let i = 0; i < months.length; i++) {
      const x = xOffset + i * (barWidth + gap);
      let y = chartHeight;

      // stack 1: low
      const lowHeight = (low[i] / maxValue) * chartHeight;
      ctx.fillStyle = '#7e6eea';
      ctx.fillRect(x, y - lowHeight, barWidth, lowHeight);
      y -= lowHeight;

      // stack 2: mid
      const midHeight = (mid[i] / maxValue) * chartHeight;
      ctx.fillStyle = '#a594f9';
      ctx.fillRect(x, y - midHeight, barWidth, midHeight);
      y -= midHeight;

      // stack 3: high
      const highHeight = (high[i] / maxValue) * chartHeight;
      ctx.fillStyle = '#dedcf8';
      ctx.fillRect(x, y - highHeight, barWidth, highHeight);

      // labels
      ctx.fillStyle = '#888';
      ctx.fillText(months[i], x + 4, chartHeight + 15);
    }

    // Y-Axis labels
    for (let i = 0; i <= 100; i += 20) {
      const y = chartHeight - (i / maxValue) * chartHeight;
      ctx.fillStyle = '#aaa';
      ctx.fillText(i.toString(), 5, y + 4);
    }
  }


  tabledata() {
    this.dash.getData().subscribe(
      (result: any)=> {
        if(result) {
          console.log(result);
          this.header = result.grid_columns.map((col: any) => col.column_name);
          this.userData = result.grid_data;
          console.log("HEAD", this.userData);
        } 
      }
    ) 
  }

 data = {
  teams: [
    { value: 'Testing' },
    { value: 'Product' },
    { value: 'Marketing' }
  ]
};

getBadgeStyle(value: string): any {
  switch (value.toLowerCase()) {
    case 'testing':
      return { backgroundColor: '#FBF2E1', color: '#FFB21A' };
    case 'product':
      return { backgroundColor: '#F1F8FE', color: '#2C5BCC' };
    case 'marketing':
      return { backgroundColor: '#EFF4FE', color: '#494DCB' };
    default:
      return { backgroundColor: '#f0f0f0', color: '#333' };
  }
}

 
// popup
showEditPopup = false;
showDeletePopup = false;

openEditPopup() {
  this.showEditPopup = true;
}

closeEditPopup() {
  this.showEditPopup = false;
}

openDeletePopup() {
  this.showDeletePopup = true;
}

closeDeletePopup() {
  this.showDeletePopup = false;
}

confirmDelete() {
  this.showDeletePopup = false;
  alert('Deleted!');
}


// pagination
value = 240;
percent = 80; // % progress

radius = 52;
circumference = 2 * Math.PI * this.radius;

get offset() {
  return this.circumference - (this.percent / 100) * this.circumference;
}


}
