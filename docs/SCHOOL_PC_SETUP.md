[새로 올리신 초본2](https://drive.google.com/file/d/1b-rX4erqkg9Aaq_4uOKOK6zzsQSORBM6/view)를 기준으로 정리했습니다. 아래 문안을 6번과 7번에 넣으면 됩니다. **참고문헌은 번호를 통일했고, 소스코드는 원격 저장소에서 실제 확인한 파일을 기준으로 작성했습니다.**

## 6) 참고문헌

[1] Hataya, R., Bao, H., and Arai, H. “Will Large-scale Generative Models Corrupt Future Datasets?” *Proceedings of the IEEE/CVF International Conference on Computer Vision (ICCV)*, 2023. [논문](https://arxiv.org/abs/2211.08095)

[2] Schuhmann, C., et al. “LAION-5B: An Open Large-Scale Dataset for Training Next Generation Image-Text Models.” *Advances in Neural Information Processing Systems (NeurIPS)*, 2022. [논문](https://arxiv.org/abs/2210.08402)

[3] Valyaeva, A. “AI Image Statistics.” *Everypixel Journal*, 2023년 8월 15일. [원문](https://journal.everypixel.com/ai-image-statistics)

[4] Gushchin, A., et al. “NTIRE 2026 Challenge on Robust AI-Generated Image Detection in the Wild.” *CVPR 2026 NTIRE Workshop Technical Report*, 2026. [논문](https://arxiv.org/abs/2604.11487)

[5] Chen, Z., Ye, J., Tsai, B., Ferrara, E., and Luceri, L. “Synthetic Politics: Prevalence, Spreaders, and Emotional Reception of AI-Generated Political Images on X.” *Proceedings of the 36th ACM Conference on Hypertext and Social Media*, 2025. [논문](https://arxiv.org/abs/2502.11248)

[6] Högemann, M., Betke, J., and Thomas, O. “What You See Is Not What You Get Anymore: A Mixed-Methods Approach on Human Perception of AI-Generated Images.” *Frontiers in Artificial Intelligence*, Vol. 8, Article 1707336, 2025. [논문](https://doi.org/10.3389/frai.2025.1707336)

[7] Shumailov, I., et al. “AI Models Collapse When Trained on Recursively Generated Data.” *Nature*, Vol. 631, pp. 755–759, 2024. [논문](https://doi.org/10.1038/s41586-024-07566-y)

[8] Alemohammad, S., et al. “Self-Consuming Generative Models Go MAD.” *International Conference on Learning Representations (ICLR)*, 2024. [논문](https://proceedings.iclr.cc/paper_files/paper/2024/file/ebc042e767de551803ccfcc45e2454f5-Paper-Conference.pdf)

[9] 과학기술정보통신부. 「‘인공지능기본법’ 22일 시행…생성형 AI 결과물 ‘워터마크’ 표시 의무」. *대한민국 정책브리핑*, 2026년 1월 21일. [원문](https://www.korea.kr/news/policyNewsView.do?newsId=148958380)

[10] The Washington Post. “Tests Show Top Social Platforms Don’t Disclose Markers on AI Videos.” 2025년 10월 22일. [원문](https://www.washingtonpost.com/technology/2025/10/22/ai-deepfake-sora-platforms-c2pa/)

[11] Zhu, M., et al. “GenImage: A Million-Scale Benchmark for Detecting AI-Generated Image.” *Advances in Neural Information Processing Systems (NeurIPS), Datasets and Benchmarks Track*, 2023. [논문](https://arxiv.org/abs/2306.08571)

[12] Pellegrini, L., et al. “AI-GenBench: A New Ongoing Benchmark for AI-Generated Image Detection.” *IJCNN 2025 Verimedia Workshop*, 2025. [논문](https://arxiv.org/abs/2504.20865)

[13] Ren, S., et al. “How Well Are Open Sourced AI-Generated Image Detection Models Out-of-the-Box: A Comprehensive Benchmark Study.” *arXiv preprint*, arXiv:2602.07814, 2026. [논문](https://arxiv.org/abs/2602.07814)

[14] 딥브레인AI. 「딥페이크 탐지 솔루션: AI 디텍터」. 공식 서비스 안내. [공식 문서](https://wf.aistudios.com/ko/deepfake-detecting)

[15] Sightengine. “AI-Generated Image Detection.” 공식 API 문서. [공식 문서](https://www.sightengine.com/docs/ai-generated-image-detection)

[16] Ojha, U., Li, Y., and Lee, Y. J. “Towards Universal Fake Image Detectors That Generalize Across Generative Models.” *Proceedings of the IEEE/CVF Conference on Computer Vision and Pattern Recognition (CVPR)*, 2023. [논문](https://arxiv.org/abs/2302.10174)

[17] He, K., Zhang, X., Ren, S., and Sun, J. “Deep Residual Learning for Image Recognition.” *Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (CVPR)*, pp. 770–778, 2016. [논문](https://openaccess.thecvf.com/content_cvpr_2016/html/He_Deep_Residual_Learning_CVPR_2016_paper.html)

[18] PyTorch. “torchvision.models.resnet18.” *Torchvision 0.22 공식 문서*. [공식 문서](https://docs.pytorch.org/vision/0.22/models/generated/torchvision.models.resnet18.html)

※ 웹 자료 및 공식 문서의 열람일: 2026년 11월 25일.

## 7) 소스코드

### 가. 소스코드 관리 및 구성

본 과제의 소스코드는 GitHub 저장소 GenMixLab에서 관리한다. Python과 PyTorch·torchvision을 기반으로 데이터 구성 목록 생성, 입력 데이터 점검, 객체 분류 모델 학습, 최종 평가 및 결과 집계 기능을 모듈별로 구성하였다.

- **저장소:** [https://github.com/ohyoonsik/GenMixLab](https://github.com/ohyoonsik/GenMixLab)
- **개발 코드:** [develop 브랜치의 src 폴더](https://github.com/ohyoonsik/GenMixLab/tree/develop/src)

보고서의 실측 결과는 생성 이미지 혼입률 0·10·20·30·50%와 조건별 시드 3회로 구성한 RQ1 실험에 해당한다. 소스코드는 데이터 준비, 학습 및 평가 단계를 구분하여 실행할 수 있도록 구성하였으며, 주요 파일과 역할은 다음과 같다.

### 나. 주요 소스코드와 역할

| 구분 | 주요 파일 | 주요 기능 |
|---|---|---|
| 메타데이터 점검 | `src/audit.py` | 메타데이터의 라벨·분할·그룹 정보 등 데이터 계약의 일관성 검사 |
| 클래스 구성 점검 | `src/class_plan.py` | 객체 클래스 매핑과 평가 데이터의 수량·구성 조건 검사 |
| 분할 고정 | `src/freeze_rq1_split.py` | RQ1에 사용할 데이터 분할과 관련 입력 정보 고정 |
| 혼입 목록 생성 | `src/make_mixtures.py` | 클래스별 학습 수를 유지하면서 혼입률과 시드에 따른 학습 목록 생성 |
| 본 실험 실행 | `src/run_rq1.py` | 고정된 입력·학습 정책을 점검하고 지정한 RQ1 조건의 학습 실행 |
| 객체 분류 학습 | `src/train_rq1.py` | 사전학습 ResNet18 미세조정, 학습·검증 기록, 체크포인트 저장 및 재개 |
| 모델 선택 | `src/model_selection.py` | 검증 결과에 따른 best epoch 선택 |
| 최종 테스트 평가 | `src/evaluate_rq1.py` | 선택된 모델을 고정 실제 테스트셋에서 평가하고 예측·평가 기록 저장 |
| 결과 집계 | `src/summarize_rq1.py` | 저장된 예측에서 Accuracy·Macro F1·클래스별 지표를 계산하고 조건별 결과 집계 |
| 실행 상태 보존 | `src/resume_state.py` | 학습 재개에 필요한 상태 저장 및 복원 |
| 목록 필터링 | `src/filter_data.py` | 외부에서 제공한 이미지별 점수와 임계값에 따라 보존·제외 목록 생성 |
| 무작위 대조군 구성 | `src/make_random_control.py` | 필터군과 클래스별 보존 수가 같은 무작위 제거 대조 목록 생성 |

필터링 관련 모듈은 점수에 따른 목록 처리 기능이다. 해당 모듈의 존재가 탐지 모델의 학습 완료나 필터 적용 후 객체 분류 성능 회복의 검증을 의미하지는 않는다.

### 다. 학습 및 평가 절차

본 실험에서는 ImageNet 사전학습 ResNet18의 출력층을 10개 객체 클래스에 맞게 변경하고 전체 층을 미세조정하였다. 모든 혼입 조건에 동일한 전처리와 학습 정책을 적용하였으며, 학습률 0.0001, 배치 크기 32, 20 epoch, AdamW 및 FP32 연산을 사용하였다. 학습률 스케줄러와 데이터 증강은 적용하지 않았다.

학습 중에는 실제 검증 이미지 500장에 대한 Macro F1을 기준으로 best 모델을 선택하였다. 최종 테스트 이미지 1,500장은 모델 선택과 학습 설정 조정에 사용하지 않고, 학습 완료 후 최종 성능 평가에 사용하였다. 조건별 예측 결과를 바탕으로 Accuracy와 Macro F1의 시드별 값, 평균과 표본 표준편차 및 클래스별 성능을 집계하였다.

### 라. 재현을 위한 자료 관리

실험 결과를 추적할 수 있도록 데이터 구성 목록, 설정, 시드, 코드 버전과 실행 기록을 함께 관리한다. 원본 이미지와 모델 가중치 등 대용량 자료는 소스코드 저장소와 분리하여 보관하고, 목록과 해시 정보를 통해 실험 입력 및 산출물을 식별한다.

보고서에 제시한 최종 성능은 실제 학습과 테스트 평가 결과이며, 가상 메타데이터를 사용하는 smoke 점검 결과와 구분한다. 필터 적용 후 성능 회복 및 미학습 생성기에 대한 추가 학습 실험은 이번 실측 결과에 포함하지 않는다.

---

**위 문안을 넣으면서 본문의 인용 번호도 아래처럼 맞춰야 합니다.**

| 본문 위치 | 초본2의 표기 | 변경할 표기 |
|---|---|---|
| 1번 항목의 Hataya·LAION·Everypixel·NTIRE·Chen·사람 판별 연구·모델 붕괴·MAD | [1]~[8] | 그대로 유지 |
| 1번 항목의 인공지능기본법 안내 | [10] | [9] |
| 1번 항목의 Washington Post 실험 | [11] | [10] |
| 1번 항목의 신규 생성기 탐지 성능 한계 | [12][13] | 관련 문장에 맞춰 [11][12][13] 사용 |
| 2번 항목의 GenImage | [1] | [11] |
| 2번 항목의 AI-GenBench | [2] | [12] |
| 2번 항목의 Ren 연구 | [3] | [13] |
| 2번 항목의 Hataya 연구 | [4] | [1] |
| 2번 항목의 딥브레인AI 서비스 | [5][6] | 일반 서비스 설명으로 정리하고 [14] |
| 2번 항목의 Sightengine | [7] | [15] |
| 3번 항목의 GenImage·Hataya·UniversalFakeDetect·AI-GenBench | [가]·[나]·[다]·[라] | [11]·[1]·[16]·[12] |
| 3·4번 항목의 ResNet18 구조·구현 설명 | 인용 없음 | 해당 문장에 [17][18] 추가 |

추가로 **1번 항목의 기존 [9]인 ‘2026년 서베이’ 문장은 정확한 원전을 특정하지 못했습니다.** 해당 문장은 현재 상태로 참고문헌을 만들어 넣기보다 삭제하는 것을 권장합니다. 딥브레인AI의 “Veo·Sora까지 탐지”라는 세부 주장도 별도 원문이 확보되지 않았으므로, 공식 문서에서 확인되는 영상·이미지·음성 탐지와 API 연동 설명으로 정리하는 편이 맞습니다.

소스코드 제출 버전에는 **실제 15회 학습에 사용한 Git commit**을 추가해야 합니다. 현재 develop의 최신 커밋을 실험 당시 버전으로 대신 적으면 안 됩니다. 원본 한글 파일은 수정하지 않았습니다.