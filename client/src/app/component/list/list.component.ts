import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/service/list.service';
import { TPartialGundamData } from 'src/app/types/types';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public data: TPartialGundamData = {
    id: 1,
    title: '初期情報登録',
  };
  public dataList: Array<TPartialGundamData> = Array(this.data);
  isLocal = false;

  constructor(private listService: ListService) {}

  ngOnInit() {
    this.listService
      .getList()
      .then((res: any) => {
        this.dataList = this.isLocal ? res.body.resData : res.body;
      })
      .catch((err) => console.log(err));
  }
  onClickRegister(e: any) {}
}
