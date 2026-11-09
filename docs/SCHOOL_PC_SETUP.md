# GenMixLab 학교 PC 환경 구성 안내

Windows 학교 PC에서 팀원이 함께 환경을 구성하고 GPU 연산과 프로젝트 검사를 실행하는 절차입니다. 명령은 한 블록씩 실행하고 오류가 발생하면 해당 단계의 출력과 환경 정보를 기록합니다.

## 사용할 환경

| 항목 | 기준 |
|---|---|
| 운영체제 | Windows |
| 환경 관리 | Miniconda, 환경명 `genmixlab` |
| Python | 3.11.x |
| PyTorch / torchvision | 2.7.1 / 0.22.1 |
| PyTorch CUDA 빌드 | cu126 |
| 학교 PC | RTX 4060 8GB, i7-13700, RAM 32GB |
| 사용 방식 | 수업시간 공동 작업, 회당 최대 3시간 |

학교 PC 사양은 팀이 제공한 정보 기준입니다. 실제 설치·GPU 실행 결과는 각 단계에서 확인합니다. 초기 여유 공간은 약 352GB였으며 설치·데이터 확보 전에 다시 확인합니다.

## 1. 기본 프로그램 설치

- [Git for Windows](https://git-scm.com/downloads/win)
- [Miniconda](https://www.anaconda.com/docs/getting-started/miniconda/install)
- [Visual Studio Code](https://code.visualstudio.com/)

VS Code에는 Microsoft의 Python과 Pylance 확장을 설치합니다. GitHub 저장소 접근 권한도 확인합니다. 아래 명령은 **시작 메뉴의 Miniconda Prompt 또는 Anaconda Prompt**에서 실행합니다. 파일 경로 이동 예시는 Windows 명령 프롬프트 문법입니다.

```bat
git --version
conda --version
nvidia-smi
```

Git·Conda 버전과 RTX 4060 표시를 확인합니다. 기존 확인 드라이버는 595.95입니다. `nvidia-smi`의 CUDA 버전은 드라이버 지원 정보이며, 아래에서 설치할 PyTorch 빌드와 구분해 기록합니다.

## 2. 프로젝트 저장소 받기

환경을 구성할 코드는 [GenMixLab 저장소](https://github.com/ohyoonsik/GenMixLab)에 있습니다. 처음 받는 PC에서 실행합니다.

```bat
cd /d "%USERPROFILE%\Documents"
git clone https://github.com/ohyoonsik/GenMixLab.git
cd GenMixLab
git switch develop
git status
```

GitHub 로그인 창이 나오면 접근 권한이 있는 계정으로 로그인합니다. 이미 받은 PC에서는 해당 GenMixLab 폴더에서 아래를 확인합니다.

```bat
git status
git branch --show-current
```

수정 파일이 없는 `develop` 브랜치에서 최신 내용을 받습니다.

```bat
git pull --ff-only origin develop
```

개발 작업은 `github-id/01/task-name`처럼 작업 브랜치를 만들고 `develop` 대상 PR로 공유합니다. 기존 수정 파일은 보존한 상태에서 진행합니다.

## 3. 독립 Python 환경 생성

`environment.yml`이 있는 GenMixLab 루트에서 실행합니다.

```bat
conda env create -f environment.yml
conda activate genmixlab
```

환경이 이미 있으면 활성화부터 실행합니다.

```bat
conda activate genmixlab
python --version
python -c "import sys; print(sys.executable)"
python -m pip --version
```

Python 3.11.x와 `envs\genmixlab` 경로를 확인합니다. 프로젝트 패키지는 이 환경 안에서 `python -m pip`로 설치합니다.

## 4. GPU용 패키지 설치

```bat
python -m pip install torch==2.7.1 torchvision==0.22.1 --index-url https://download.pytorch.org/whl/cu126
python -m pip install -r requirements.txt
python -m pip check
```

마지막 명령의 정상 출력은 `No broken requirements found.`입니다. PyTorch의 버전과 CUDA 빌드 조합은 [공식 이전 버전 설치 안내](https://pytorch.org/get-started/previous-versions/)에서 확인할 수 있습니다.

## 5. 패키지와 CUDA 인식 확인

```bat
python -c "import torch, torchvision, PIL, numpy, pandas, sklearn, matplotlib, seaborn; print('torch:', torch.__version__); print('torchvision:', torchvision.__version__); print('CUDA build:', torch.version.cuda); print('CUDA available:', torch.cuda.is_available())"
```

설치한 조합에서 기대하는 주요 출력입니다.

```text
torch: 2.7.1+cu126
torchvision: 0.22.1+cu126
CUDA build: 12.6
CUDA available: True
```

CUDA가 False라면 아래 문제 해결 절차에서 설치 상태를 확인합니다.

## 6. 실제 GPU 연산과 역전파 확인

GPU 텐서 연산을 확인합니다.

```bat
python -c "import torch; print(torch.cuda.get_device_name(0)); x=torch.randn(512,512,device='cuda'); y=x@x; torch.cuda.synchronize(); print('device:', y.device); print('GPU calculation OK')"
```

GPU 이름, `device: cuda:0`, `GPU calculation OK`를 확인합니다. 이어서 임의 입력과 무작위 초기화 ResNet18로 전방 연산·역전파·가중치 갱신을 확인합니다.

```bat
python -c "import torch; from torchvision.models import resnet18; m=resnet18(weights=None,num_classes=2).cuda(); opt=torch.optim.AdamW(m.parameters(),lr=1e-4); x=torch.randn(2,3,224,224,device='cuda'); target=torch.tensor([0,1],device='cuda'); opt.zero_grad(); pred=m(x); loss=torch.nn.functional.cross_entropy(pred,target); loss.backward(); opt.step(); torch.cuda.synchronize(); print('GPU forward/backward OK'); print('output shape:', tuple(pred.shape)); print('loss:', loss.item())"
```

`GPU forward/backward OK`와 `output shape: (2, 2)`가 나오면 연산 점검을 통과한 것입니다. 출력 loss는 임의 입력을 사용한 점검값으로 기록합니다. 실제 모델 성능은 예제·본 실험 데이터로 별도 측정합니다.

## 7. 프로젝트 자체검사

저장소 루트에서 실행합니다.

```bat
python -m unittest discover -s tests -v
python -m src.smoke
```

단위 테스트의 `OK`와 smoke의 `PASS`를 확인합니다. smoke는 가상 메타데이터로 혼입 목록 15개와 필터·무작위 대조군의 연결을 점검합니다. 실제 이미지 로딩과 학습·저장·재개는 해당 코드의 실행 안내에 따라 확인합니다.

## 8. VS Code 연결

Prompt에서 저장소를 엽니다.

```bat
code .
```

VS Code에서 `Ctrl+Shift+P` → `Python: Select Interpreter` → Python 3.11의 `genmixlab` 환경을 선택합니다. 터미널에서 아래 경로를 확인합니다.

```bat
python -c "import sys; print(sys.executable)"
```

`envs\genmixlab` 경로여야 합니다. 필요하면 터미널 프로필을 Command Prompt로 선택해 새로 열고 `conda activate genmixlab`을 실행합니다. `code` 명령을 찾지 못하면 VS Code를 직접 열어 GenMixLab 폴더를 선택합니다.

## 9. 환경 기록 저장

다음 명령은 GenMixLab 폴더에서 실행합니다.

```bat
python -c "from pathlib import Path; Path('runs/environment').mkdir(parents=True,exist_ok=True)"
python -m pip freeze > runs/environment/requirements-freeze.txt
conda env export --from-history > runs/environment/conda-history.yml
nvidia-smi > runs/environment/nvidia-smi.txt
git rev-parse HEAD > runs/environment/git-commit.txt
```

수업 종료 전에 팀 공유 공간으로 기록을 복사합니다. 실행 로그와 체크포인트의 위치도 함께 인계합니다. 환경 출력에는 설치 경로가 포함될 수 있으므로 공유 범위에 맞게 확인합니다.

## 10. 예제 실행과 수업 종료 점검

팀의 예제 사진 12장과 CSV가 준비되면 PR에 기록된 실행 명령으로 이미지 로딩·짧은 학습·검증·체크포인트 저장·새 프로세스 재개를 확인합니다. epoch별 시간과 최대 VRAM, 사용 commit·시드를 기록합니다. 종료 20~30분 전에는 저장·백업과 다음 실행 인계를 진행합니다.

- [ ] Python 3.11과 `genmixlab` 경로 확인
- [ ] PyTorch 2.7.1 / torchvision 0.22.1의 cu126 빌드 확인
- [ ] `python -m pip check` 통과
- [ ] CUDA 사용 가능 True 확인
- [ ] GPU 텐서 연산과 ResNet18 역전파 통과
- [ ] 프로젝트 단위 테스트와 smoke 통과
- [ ] VS Code 인터프리터 연결
- [ ] 환경·실행 기록 저장과 팀 공유

## 자주 막히는 부분

| 증상 | 확인할 내용 |
|---|---|
| conda 명령을 찾지 못함 | 시작 메뉴의 Miniconda/Anaconda Prompt를 새로 열기 |
| git 명령을 찾지 못함 | Git 설치 후 Prompt 재실행 |
| 저장소 접근 거부 | 로그인 계정과 저장소 초대 수락 여부 |
| VS Code에서만 import 실패 | 선택 인터프리터와 터미널의 Python 경로 |
| GPU 메모리 부족 | 실행 중인 GPU 프로그램, 예제 배치 크기 |
| CUDA available이 False | CPU용 패키지 여부, GPU 드라이버 상태 |

CPU용 PyTorch가 이미 설치되어 GPU 빌드로 바꿔야 하는 경우 `genmixlab` 환경에서 실행합니다.

```bat
python -m pip uninstall -y torch torchvision
python -m pip install torch==2.7.1 torchvision==0.22.1 --index-url https://download.pytorch.org/whl/cu126
python -m pip check
```

오류가 계속되면 실행 명령, 오류 출력 전체, `nvidia-smi`와 패키지 버전을 남깁니다.

## 프로젝트 문서

- [GenMixLab 개발환경 안내](https://github.com/ohyoonsik/GenMixLab/blob/develop/docs/DEVELOPMENT_SETUP.md)
- [1주차 작업 지시서](https://github.com/ohyoonsik/GenMixLab/issues/25)
- [데이터 규약](https://github.com/ohyoonsik/GenMixLab/blob/develop/docs/DATA_CONTRACT.md)
- [협업 가이드](https://github.com/ohyoonsik/GenMixLab/blob/develop/docs/GUIDE.md)

이 안내의 작성 기준일은 2026년 11월 9일입니다. 설치 명령과 점검 기대값을 안내하며 학교 PC에서 수행한 결과는 팀 실행 기록에 남깁니다.
