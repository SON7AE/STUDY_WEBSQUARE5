// 데이터맵, 데이터리스트, 서브미션 실행함수
scwin.onpageload = function () {
  dataMapName.set('dataKeyId', 'dataKeyIdValue');
  // 서브미션 실행함수
  com.sbm.execute('submissionName', {}, gcm.SERVICE_LIST_FCMM);
  // gcm.SERVICE_LIST_FCMM 이 부분은 서버 이름에 따라 다르다.
};

// 등록방식 변경 - 체크박스 선택시 UI 제어
// onchange 함수를 활용하여 내부에서 getValue() 값을 체크해
// display: none; 과 같이 스타일을 제어할 수 있다.
scwin.idName_onchange = function () {
  var selectedCurrentAttr = idName.getValue();
  console.log(selectedCurrentAttr);

  if (selectedCurrentAttr == 'IMG') {
    videoContainer.setDisabled(true);
  } else {
    videoContainer.setDisabled(false);
  }
};

// --------------------------------------------------------------------
// 버튼클릭 - 페이지 이동
scwin.idName_onclick = function () {
  scwin.$w.parent().scwin.selectTab(0);
};
// 위 함수처럼 $w.parent()를 사용하기 위해선
// 부모 컴포넌트(?)에 아래 함수가 있어야 한다.
scwin.selectTab = function (tabIndex) {
  // tabControl : tab ID 명
  tabControl.setSelectedTabIndex(tabIndex);
};

// --------------------------------------------------------------------
// 탭 생성 클릭이벤트
// 등록 및 탭 생성 버튼의 퍼블리싱 레이아웃이 있다면 이곳에 먼저 이벤트를 걸어준다.
scwin.idName_onclick = function (e) {
  let tabId = '';
  // tabControl : tab ID 명
  let tabInfoList = tabControl.getTabInfo();
  let tabIndex = 0;
  let openAction = 'new';

  var label = '등록'; // 이름은 프로젝트에 맞게 기입

  // 이미 탭이 열린 경우, 해당 탭으로 이동
  let i = 0;
  for (i = 1; i < tabInfoList.length; i++) {
    if (tabInfoList[i].label == label) {
      tabId = tabInfoList[i].id;
      tabIndex = i;
      openAction = ' exist';
    }

    if (Comment.util.isEmpty(tabId)) {
      tabId = 'tab' + (tabControl.getTabCount() + 1);
      tabIndex = tabControl.getTabCount();
    }

    var tabOptions = {
      label: label,
      closable: true,
      openAction: openAction,
    };

    // 등록페이지 URL 입력
    var src = ''; // url address 기입
    var contentsOptions = {
      frameMode: 'wframePreload',
      src: src,
      alwaysDraw: false,
      title: label,
      dataObject: {
        type: 'json',
        name: 'param',
        data: {
          tabIndex: tabIndex,
        },
      },
    };
    tabId = tabControl.addTab(tabId, tabOptions, contentsOptions);
    tabControl.setSelectedTabIndex(tabIndex);
  }
};

// --------------------------------------------------------------------
// 변경사항 저장 클릭 이벤트
scwin.idName = function () {
  // 필수요소 조건
  dataMapName.set('dataKeyId', 'dataKeyIdValue');

  // 변경사항 조건
  // getValue() 메서드로 레이아웃에 기입된 현재 값을 인식한다.
  dataMapName.set('dataKeyId', dataKeyIdValue.getValue());
  dataMapName.set('dataKeyId', dataKeyIdValue.getValue());

  com.sbm.execute('submissionName', {}, gcm.SERVICE_LIST_FCMM);
};

// --------------------------------------------------------------------
// 취소 버튼 / 리셋 클릭 이벤트
// 취소 버튼을 눌렀을 때, 데이터를 빈 값으로 넘겨준다 이해하면 된다.
scwin.btn_reset_onclick = function () {
  com.win.setInt(LayoutIdName);
  dataMapName.set('dataKeyId', '');
};

// --------------------------------------------------------------------
// Textarea와 같이 텍스트 값이 Null일 경우 에러 처리 알람
if (com.util.isEmpty(dataMapName.get('KeyId'))) {
  com.win.alert(com.data.getMessage('com.alt.0013', '배너명'));
  // com.alt.0013 : 프로젝트 공통알람코드
  // '배너명' : 레이아웃 label 값
}

// --------------------------------------------------------------------
// 파일업로드 함수
scwin.btn_fileUpload_onclick = function (e) {
  var url = '/path 경로지정';
  var data = {
    type: 'insert',
    policy: 'public-img',
    subPath: '/fcmm/prod/',
    callbackFn: 'scwin.popupCallBack',
  };
  var options = {
    id: 'insertPopup',
    popupName: '파일등록',
    modal: true,
    width: 700,
    height: 250,
    type: 'wframePopup',
  };

  com.win.openPopup(url, options, data);
};
// 파일업로드 콜백함수
scwin.popupCallBack = function (retObj) {
  if (retObj.status == 'S') {
    com.win.toast(com.data.getMessage('com.inf.0008'));
    dlt_addImage.removeAll(); // 삭제
    dlt_addImage.insertRow(); // 로우

    // 여러개의 리스트가 돌아갈 땐 for문을 돌린다. 그리고 0 대신에 i를 할당해준다.
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
    dlt_addImage.setCellData(0, 'dataListId', 'dataListValue');
  } else {
    com.win.alert(com.data.getMessage('com.alt.0004', retObj.fileOrginName));
  }

  // 그리고나서 최종 파일을 등록할 때, 실행시키는 함수에서
  // 데이터맵 부분에 아래와 같이 세팅해준다.
  // dataMapName.set('데이터맵 내 파일데이터리스트 받는 변수이름', '데이터 값');
  // 상세페이지에서 기존의 데이터를 불러올 땐, 아래와 같이 작성한다.
  // var ImageValue = dataMapName.get('해당 데이터 변수');
  //
};
