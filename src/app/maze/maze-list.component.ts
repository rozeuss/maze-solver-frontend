import {Component, OnInit} from '@angular/core';
import {MazeService} from './maze.service';
import {Maze} from './maze';

@Component({
  selector: 'app-maze-list',
  templateUrl: './maze-list.component.html',
  styleUrls: ['./maze-list.component.css']
})
export class MazeListComponent implements OnInit {

  mazes: Maze[];

  constructor(private mazeService: MazeService) {
  }

  ngOnInit(): void {
    this.mazeService.findAll().subscribe(data => {
      console.log(data);
      this.mazes = data;
    });
  }

}
