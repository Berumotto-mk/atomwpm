# AtomWPM

Project website for **AtomWPM: Fast 4D Prediction from Pretrained Video Representations**.

## Preview locally

```sh
python3 -m http.server 8765 --directory dist
```

Then open http://localhost:8765.

## Update content

Edit `dist/content.js` to add public paper, code, model, or dataset URLs and rollout videos. Blank URLs display “Coming soon.” Put media in `dist/assets/videos/` and use relative paths such as `assets/videos/overview.mp4`. See [the rollout guide](ROLLOUT_GUIDE.md) for suggested exports and result metadata.

The current visuals are selected static figures from the manuscript. Video rollouts and public resource links are pending. Author names and affiliations follow the information supplied by the authors. Replace the draft citation with final publication metadata at release.

## Deployment

GitHub Pages deploys the `dist/` directory using `.github/workflows/pages.yml`. In Settings → Pages, select **GitHub Actions** as the publishing source. Pushes to `main` and manual workflow runs update the website.

## Acknowledgment

Page layout inspired by [Neural Gaussian Force Field](https://neuralgaussianforcefield.github.io/). AtomWPM text, figures, and results belong to this project.
