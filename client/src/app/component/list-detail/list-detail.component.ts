import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AjaxService } from 'src/app/service/ajax.service';
import { Location } from '@angular/common';
import { HotToastService } from '@ngneat/hot-toast';
import { environment } from 'src/environments/environment';
import { TPartialGundamData } from 'src/app/types/types';

@Component({
  selector: 'app-list-detail',
  templateUrl: './list-detail.component.html',
  styleUrls: ['./list-detail.component.scss'],
})
export class ListDetailComponent implements OnInit {
  detailData: any;
  isLocal = environment.local;
  detailId = Number(this.route.snapshot.paramMap.get('id'));
  file = null;
  img2base64 = '';
  isEdit = false;
  hasOriginalImg = false;
  hasEditedImg = false;
  showButton = false;

  constructor(
    private route: ActivatedRoute,
    private ajaxService: AjaxService,
    private location: Location,
    private toastService: HotToastService
  ) {}

  ngOnInit() {
    this.getDetailData();
  }

  getDetailData() {
    this.ajaxService
      .getDetailData(this.detailId)
      .then((res: any) => {
        this.detailData = this.isLocal ? res.body.detailData : res.body;
        this.showButton = this.detailData.image.length ? true : false;
      })
      .catch((err) => this.toastService.error(err));
  }

  onClickEdit(): boolean {
    return (this.isEdit = this.isEdit === false ? true : false);
  }

  onChangeFileInput(event: any) {
    const reader = new FileReader();
    if (event.target.files.length === 0) {
      return;
    }
    this.file = event.target.files[0];
    reader.onload = () => {
      this.img2base64 = reader.result as string;
      this.hasEditedImg = !!this.img2base64.length;
    };
    reader.readAsDataURL(this.file as any);
  }

  onClickDeleteImg() {
    this.detailData.image = '';
    this.img2base64 = '';
    this.file = null;
    this.showButton = false;
  }

  updateData(data: TPartialGundamData) {
    this.hasOriginalImg = !!this.detailData.image.length;
    //編集後画像あり -> 編集後画像をput
    if (this.hasEditedImg) {
      data.image = this.img2base64;
      //元画像あり、かつ編集後画像なし -> 元画像をput
    } else if (this.hasOriginalImg && !this.hasEditedImg) {
      data.image = this.detailData.image;
    } else {
      data.image = null;
    }
    const body = { ...data, id: this.detailId, image: data.image };
    this.ajaxService.updateData(body).subscribe(
      () => {
        this.toastService.success('データ更新しました');
        this.getDetailData();
      },
      () => {
        this.toastService.error('データ更新失敗!');
      }
    );
  }

  deleteData() {
    this.ajaxService.deleteData(this.detailId).subscribe(
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
