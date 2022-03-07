from essay.models import EssayCorrection


def essay_correction_timeout(correction_id):
    essay_correction = EssayCorrection.objects.get(id=correction_id)
    # If essay_correction is still in PENDING status, set it to TIMEOUT
    if essay_correction.status == "PENDING":
        essay_correction.status = "TIMEOUT"
        essay_correction.save()

        # Create new EssayCorrection in PENDING status
        EssayCorrection.objects.create(
            essay=essay_correction.essay,
            duration=essay_correction.duration,
            status="PENDING",
        )
