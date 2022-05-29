import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from 'src/app/service/list.service';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  detailData: any;
  isLocal = environment.local;
  detailId = Number(this.route.snapshot.paramMap.get('id'));
  img2base64 = '';

  constructor(
    private route: ActivatedRoute,
    private listService: ListService,
    private location: Location,
    private toastService: HotToastService
  ) {}

  ngOnInit() {
    this.getDetailData();
  }

  getDetailData() {
    this.listService
      .getDetailData(this.detailId)
      .then((res: any) => {
        console.log(res.body.detailData);
        this.detailData = this.isLocal ? res.body.detailData : res.body;
      })
      .catch((err) => this.toastService.error(err));
  }

  onChangeFileInput(event: any) {
    let file = null;
    let reader = new FileReader();
    if (event.target.files.length === 0) {
      return;
    }
    file = event.target.files[0];
    reader.onload = () => {
      this.img2base64 = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  updateData(data: any) {
    const body = { ...data, id: this.detailId };
    this.listService.updateData(body).subscribe(
      () => {
        this.toastService.success('データ更新しました');
      },
      () => {
        this.toastService.error('データ更新失敗!');
      }
    );
  }

  deleteData() {
    this.listService.deleteData(this.detailId).subscribe(
      (res) => {
        this.toastService.success('データ削除しました');
        this.backBtnClick();
      },
      (err) => {
        this.toastService.error('データ削除に失敗!');
      }
    );
  }

  backBtnClick() {
    this.location.back();
  }
}
