#!/usr/bin/env python3
"""Build Dawit Haile's resume PDF, tailored for a Lead Software Engineer (Full Stack) role."""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_CENTER
from reportlab.platypus import (
    BaseDocTemplate, Frame, PageTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable,
)
from reportlab.lib.styles import ParagraphStyle

OUT = "Dawit_Haile_Resume.pdf"

NAVY = HexColor("#16324f")
SLATE = HexColor("#44546a")
GRAY = HexColor("#5a5a5a")
RULE = HexColor("#b7c4d3")

MARGIN = 0.62 * inch
PAGE_W, PAGE_H = letter

doc = BaseDocTemplate(
    OUT, pagesize=letter,
    leftMargin=MARGIN, rightMargin=MARGIN, topMargin=0.5 * inch, bottomMargin=0.45 * inch,
    title="Dawit Haile — Resume", author="Dawit Haile",
)
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main",
              leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
doc.addPageTemplates([PageTemplate(id="page", frames=[frame])])

name_style = ParagraphStyle("name", fontName="Helvetica-Bold", fontSize=21.5,
                            leading=25, textColor=NAVY, alignment=TA_CENTER,
                            spaceAfter=3)
contact_style = ParagraphStyle("contact", fontName="Helvetica", fontSize=9.2,
                               leading=12.5, textColor=GRAY, alignment=TA_CENTER)
section_style = ParagraphStyle("section", fontName="Helvetica-Bold", fontSize=10.3,
                               leading=13, textColor=NAVY, spaceBefore=8.5, spaceAfter=1)
body_style = ParagraphStyle("body", fontName="Helvetica", fontSize=9.4,
                            leading=11.9, textColor=HexColor("#222222"))
bullet_style = ParagraphStyle("bullet", parent=body_style, leftIndent=12,
                              bulletIndent=2, spaceBefore=1.0)
skill_style = ParagraphStyle("skill", parent=body_style, leading=12.8, spaceBefore=1.0)
job_title_style = ParagraphStyle("jobtitle", fontName="Helvetica-Bold", fontSize=10.2,
                                 leading=13, textColor=HexColor("#1c1c1c"))
job_co_style = ParagraphStyle("jobco", fontName="Helvetica", fontSize=9.4,
                              leading=12, textColor=SLATE)
date_style = ParagraphStyle("date", fontName="Helvetica", fontSize=9.2,
                            leading=13, textColor=GRAY, alignment=2)

story = []

# ---------------- Header ----------------
story.append(Paragraph("Dawit Haile", name_style))
story.append(Paragraph(
    "Plano, TX &nbsp;&bull;&nbsp; (510) 631-5042 &nbsp;&bull;&nbsp; "
    "haile.t.dawit@gmail.com &nbsp;&bull;&nbsp; linkedin.com/in/dawit-haile",
    contact_style))
story.append(Spacer(1, 5))
story.append(HRFlowable(width="100%", thickness=1.1, color=NAVY, spaceAfter=2))


def section(title):
    story.append(Paragraph(title.upper(), section_style))
    story.append(HRFlowable(width="100%", thickness=0.6, color=RULE, spaceBefore=1,
                            spaceAfter=3))


def job(title, company, dates, bullets):
    header = Table(
        [[Paragraph(title, job_title_style), Paragraph(dates, date_style)],
         [Paragraph(company, job_co_style), ""]],
        colWidths=[doc.width * 0.72, doc.width * 0.28],
    )
    header.setStyle(TableStyle([
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 0),
        ("TOPPADDING", (0, 0), (-1, -1), 0),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]))
    story.append(Spacer(1, 3))
    story.append(header)
    story.append(Spacer(1, 1))
    for b in bullets:
        story.append(Paragraph(b, bullet_style, bulletText="•"))


# ---------------- Summary ----------------
section("Summary")
story.append(Paragraph(
    "Software engineer with 8 years building and running cloud-based microservices for major "
    "financial institutions — Chase, Discover, Citi, and Synchrony. Currently lead feature "
    "delivery for Chase credit card lending systems on AWS, owning services from design through "
    "production and mentoring the engineers around me. Deep in Java, Spring Boot, and AWS, with "
    "hands-on experience across the stack, and used to shipping frequently in regulated, "
    "high-traffic environments where reliability and compliance are non-negotiable.",
    body_style))

# ---------------- Skills ----------------
section("Technical Skills")
skills = [
    ("Languages", "Java, Python, SQL, JavaScript/TypeScript, HTML/CSS"),
    ("Backend", "Spring Boot, Spring MVC, JPA/Hibernate, REST APIs, event-driven microservices"),
    ("Cloud &amp; Containers", "AWS (ECS, EC2, Lambda, S3, EventBridge, Step Functions), "
     "Docker, Kubernetes (OpenShift), Pivotal Cloud Foundry"),
    ("Databases", "MySQL, MariaDB, Oracle"),
    ("CI/CD &amp; Tooling", "Jenkins, Spinnaker, GitHub, SonarQube, Maven, Gradle, Vault, uDeploy"),
    ("Testing &amp; Monitoring", "JUnit, Mockito, TDD/BDD, Splunk, AppDynamics, Kibana"),
    ("Practices", "Agile/Scrum, pair programming, code review, AI-assisted development "
     "(GitHub Copilot for scaffolding, test generation, and refactoring)"),
]
for label, val in skills:
    story.append(Paragraph(f"<b>{label}:</b> {val}", skill_style))

# ---------------- Experience ----------------
section("Experience")

job("Senior Software Engineer III",
    "JPMorgan Chase &amp; Co. — Plano, TX",
    "Oct 2023 – Present",
    [
        "Lead development of credit line increase features for consumer and business Chase "
        "credit cards — systems that make lending decisions for millions of cardholders under "
        "strict regulatory requirements.",
        "Design and build microservice APIs end to end, from data model through deployment on "
        "AWS ECS, working closely with product managers to turn business and compliance needs "
        "into working software.",
        "Mentor junior engineers through design reviews, pairing, and code review; raised the "
        "team's bar for test coverage and CI/CD discipline.",
        "Own production releases and incident response for the team's services, keeping "
        "deployments frequent while holding downtime near zero.",
    ])

job("Senior Software Engineer II",
    "Perficient (Discover Financial Services) — Austin, TX",
    "Aug 2021 – Oct 2023",
    [
        "Modernized the microservices behind Discover's credit card offers and referrals, "
        "running on OpenShift (Kubernetes), replacing aging components without disrupting live "
        "traffic.",
        "Built REST APIs serving dynamic, personalized customer interactions at scale.",
        "Led an offshore development team day to day — set coding standards, ran pair "
        "programming and TDD, and kept quality consistent across time zones.",
        "Built and maintained CI/CD pipelines that shortened release cycles and cut failed "
        "deployments.",
    ])

job("Software Engineer",
    "Tata Consultancy Services (Citi) — Irving, TX",
    "Dec 2018 – Aug 2021",
    [
        "Built microservices for Citi Text Banking, letting cardholders check balances and "
        "account activity over SMS.",
        "Drove the migration of legacy payment-alert and OTP systems to cloud microservices on "
        "Pivotal Cloud Foundry.",
        "Profiled and tuned backend services, cutting API response times for customer-facing "
        "flows.",
    ])

job("Software Engineer",
    "Capgemini (Synchrony Financial) — Frisco, TX",
    "Jun 2018 – Dec 2018",
    [
        "Migrated mid-tier services to Pivotal Cloud Foundry and streamlined CI/CD workflows "
        "for smoother production releases.",
    ])

# ---------------- Education ----------------
section("Education")
edu = Table(
    [[Paragraph("<b>M.S., Computer Modeling</b> — Vilnius University", body_style),
      Paragraph("2016", date_style)],
     [Paragraph("<b>B.S., Computer Science</b> — Eritrea Institute of Technology", body_style),
      Paragraph("2011", date_style)]],
    colWidths=[doc.width * 0.78, doc.width * 0.22],
)
edu.setStyle(TableStyle([
    ("LEFTPADDING", (0, 0), (-1, -1), 0),
    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
    ("TOPPADDING", (0, 0), (-1, -1), 1),
    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
]))
story.append(edu)

doc.build(story)
print("built", OUT)
