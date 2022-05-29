import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AjaxService } from 'src/app/service/ajax.service';
import { HotToastService } from '@ngneat/hot-toast';
import { TPartialGundamData } from 'src/app/types/types';

@Component({
  selector: 'app-data-registration',
  templateUrl: './data-registration.component.html',
  styleUrls: ['./data-registration.component.scss'],
})
export class DataRegistrationComponent implements OnInit {
  img2base64: string = '';

  constructor(
    private ajaxService: AjaxService,
    private location: Location,
    private toastService: HotToastService
  ) {}

  ngOnInit() {}

  backBtnClick() {
    this.location.back();
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

  onSubmit(data: TPartialGundamData): void {
    data.image = data.image?.length ? this.img2base64 : null;
    const body = JSON.stringify(data);
    this.ajaxService.registerData(body as TPartialGundamData).subscribe(
      () => {
        this.toastService.success('データを登録しました');
        this.backBtnClick();
      },
      (err) => {
        this.toastService.error('データ登録失敗!');
      }
    );
  }
}
